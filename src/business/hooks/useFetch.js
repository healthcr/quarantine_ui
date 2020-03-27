import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useFetch({ path }) {
  const { state, dispatch } = useStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ajax = new Ajax(state, dispatch);

  async function fetch(variables) {
    setLoading(true);
    try {
      const response = await ajax.post({ path: path, body: variables });
      setData(response);

      return Promise.resolve(response);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  }

  return { fetch, data, loading, error };
}
