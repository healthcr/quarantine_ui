import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useFetch({ name, components = {} }) {
  const { state, dispatch } = useStore();
  const path = "crm/metadata/get";
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ajax = new Ajax(state, dispatch);

  async function fetch() {
    setLoading(true);
    setMetadata(null);
    try {
      const response = await ajax.post({ path: path, body: { name } });

      response.form = response.form.map(formSection => {
        var columns = enrichList({
          list: formSection.columns,
          schema: response,
          components
        });
        return { ...formSection, columns: columns };
      });
      response.table = enrichList({
        list: Object.keys(response.properties),
        schema: response
      });

      setMetadata(response);
      return Promise.resolve(response);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  }

  function enrichList({ schema, list, components }) {
    return list.map(key => {
      var column = {
        ...schema.properties[key]
      };

      if (components && components[key]) {
        column.render = "component";
        column.component = components[key];
      }

      return column;
    });
  }

  if (!loading && !metadata && !error) fetch();
  return { fetch, metadata, loading, error };
}
