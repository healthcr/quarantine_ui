import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useMutation(mutation) {
  const { state, dispatch } = useStore();

  const [response, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const ajax = new Ajax(state, dispatch);

  async function mutate(variables) {
    if (mutation.transformValue) {
      var newValues = {};
      Object.keys(variables).forEach(key => {
        if (variables[key] && variables[key].value != null)
          newValues[key] = variables[key].value;
      });
    }

    setError({ message: null, success: false });
    setLoading(true);
    try {
      const responseData = await ajax.post({
        path: mutation.path,
        body: variables
      });
      setData(responseData);
      setError({ message: null, success: true });
      return Promise.resolve(responseData);
    } catch (e) {
      setError({ ...e, success: false });
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  }

  return { mutate, response, loading, error };
}
