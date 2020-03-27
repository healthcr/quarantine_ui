import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Hero from "../components/hero";
import Login from "../components/login";

import { useStore } from "business/hooks/useStore";
import { useGet } from "business/hooks/useGet";

import mixpanel from "mixpanel-browser";

const useStyles = makeStyles(theme => ({}));

export default function Album() {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { get, response, loading, error } = useGet();

  React.useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);
  }, []);

  const onLogin = ({ phone, pais }) => {
    dispatch({
      type: "login",
      payload: { phone, pais }
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Login state={state} onLogin={onLogin} />
      </main>
    </React.Fragment>
  );
}
