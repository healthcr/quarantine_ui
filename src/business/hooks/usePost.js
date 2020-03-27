import React, { useState, useEffect } from "react";
import { useStore } from "./useStore";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export function usePost() {
  const { state, dispatch } = useStore();

  const [response, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });

  async function post({ path, body, useAuth }) {
    setError({ message: null, success: false });
    setLoading(true);
    var user = state.user || {};
    var authorization = user.authorization;

    var url = "http://localhost:5000";
    if (process.env.REACT_APP_ENV == "staging")
      url = "https://afternoon-reaches-54804.herokuapp.com";
    else if (process.env.REACT_APP_ENV == "production")
      url = "https://coronacrorg.herokuapp.com";

    try {
      var response = await axios({
        method: "post",
        url: `${url}/${path}`,
        data: body,
        headers:
          authorization && authorization.length > 1 && useAuth !== false
            ? {
                "Content-Type": "application/json",
                Authorization: authorization
              }
            : {
                "Content-Type": "application/json"
              }
      });

      return Promise.resolve(response.data);
    } catch (e) {
      setLoading(false);
      setError({ ...e, success: false });
      return Promise.reject(e);
    }
  }

  return { post, response, loading, error };
}
