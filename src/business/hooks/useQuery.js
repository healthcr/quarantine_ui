import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useQuery({ path, limit = 25 }) {
  const { state, dispatch } = useStore();
  const [pageInfo, setPageInfo] = useState();
  const [lastBody, setLastBody] = useState();
  const [data, setData] = useState([]);

  const [filters, setFilters] = React.useState([]);
  const [sortColumn, setSortColumn] = React.useState([]);
  const [columns, setColumns] = React.useState(null);

  const [totalCount, setTotalCount] = useState(0);
  const [dataByPage, setDataByPage] = useState([]);

  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(null);
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
    setRequests(requests + 1);
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

  async function fetchAgain() {
    return _fetch(lastBody);
  }

  async function sort(column, direction) {
    var newSort;
    if (direction == "NONE") newSort = null;
    else newSort = { [column]: direction };
    setSortColumn(newSort);
    return fetch({ sort: newSort });
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

    if (filter.sort) body.sort = filter.sort;
    else if (sortColumn) body.sort = sortColumn;

    return _fetch({ ...body, filters: body.filters });
  }

  async function _fetch(body) {
    setLastBody(body);
    setLoading(true);
    setRequests(requests + 1);
    let ajax = new Ajax(state, dispatch);
    try {
      const response = await ajax.post({
        path,
        body: body
      });
      setPageInfo(response.pageInfo);
      if (response.pageInfo.totalCount)
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
    requests,
    fetch,
    data,
    error,
    fetchMore,
    fetchAgain,
    fetchLess,
    totalCount,
    filter,
    sort
  };
}
