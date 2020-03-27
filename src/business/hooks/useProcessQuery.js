import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useProcessQuery({
  path,
  limit = 25,
  statusField = "status"
}) {
  const { state, dispatch } = useStore();
  const [pageInfo, setPageInfo] = useState();
  const [data, setData] = useState([]);
  const [status, setStatus] = React.useState("");
  const [filters, setFilters] = React.useState([]);
  const [columns, setColumns] = React.useState(null);

  const [totalCount, setTotalCount] = useState(0);
  const [dataByPage, setDataByPage] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchLess(pageIndex) {
    setData(dataByPage[pageIndex - 1]);
    setDataByPage(dataByPage.slice(0, -1));
  }

  async function fetchMore() {
    if (!pageInfo)
      return setError(new Error("Page Info is required to fetchMore"));
    setLoading(true);
    setData([]);
    let ajax = new Ajax(state, dispatch);
    try {
      const response = await ajax.post({
        path,
        body: { cursor: pageInfo.endCursor }
      });
      setPageInfo(response.pageInfo);
      setData(response.edges);
      setDataByPage([...dataByPage, response.edges]);
    } catch (e) {
      setError(e);
    } finally {
      ajax = null;
      setLoading(false);
    }
  }

  async function filter(filter) {
    setPageInfo();
    setTotalCount(0);
    setData([]);
    setDataByPage([]);
    fetch(filter);
  }

  async function fetch(filter = {}) {
    var body = { limit: limit };
    if (filter.filters) {
      setFilters(filter.filters);
      body.filters = filter.filters;
    } else body.filters = [...filters];

    if (filter.columns) {
      setColumns(filter.columns);
      body.columns = filter.columns;
    } else if (columns) body.columns = [...columns];

    if (filter.filterName) body.filterName = filter.filterName;

    if (filter.status) setStatus(filter.status);

    setLoading(true);
    let ajax = new Ajax(state, dispatch);
    try {
      const response = await ajax.post({
        path,
        body: {
          ...body,
          filters: [
            ...body.filters,
            [statusField, "=", filter.status || status]
          ]
        }
      });
      setPageInfo(response.pageInfo);
      setTotalCount(response.pageInfo.totalCount);
      setData(response.edges);
      setDataByPage([response.edges]);
    } catch (e) {
      setError(e);
    } finally {
      ajax = null;
      setLoading(false);
    }
  }

  return {
    loading,
    fetch,
    setStatus,
    status,
    data,
    error,
    fetchMore,
    fetchLess,
    totalCount,
    filter
  };
}
