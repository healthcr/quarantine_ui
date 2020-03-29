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

  const onLogin = ({ phone, pais }) => {
    mixpanel.identify("+" + pais + "" + phone);

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
