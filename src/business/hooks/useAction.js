import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import Ajax from "ui/business/hooks/helpers/ajax";

export default function useAction({ name }) {
  const { state, dispatch } = useStore();

  const [response, setData] = useState([]);
  const [metadata, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const ajax = new Ajax(state, dispatch);

  async function action({ metadata, action, ids }) {
    setError({ message: null, success: false });
    setLoading(true);

    try {
      const responseData = await ajax.post({
        path: `crm/${name}/${action}`,
        body: { ids: ids }
      });
      setData(responseData);
      setError({ message: null, success: true });
      setLoading(false);
      return Promise.resolve(responseData);
    } catch (e) {
      setLoading(false);
      setError({ ...e, success: false });
      return Promise.reject(e);
    }
  }

  return { action, response, loading, error, setMetaData };
}
