import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import AccountCircle from "@material-ui/icons/Search";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },

  info: {
    lineHeight: "40px"
  },
  orange: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 7,
    marginBottom: 2,
    marginTop: 10,
    fontSize: "0.75rem"
  },
  error: {
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[900]
  },
  success: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500]
  },
  productAmount: {
    width: 80
  },
  formControl: {
    marginBottom: 10
  }
}));

export default function CustomerAsynchronous(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [ssn, setSsn] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      await props.onLogin({ ssn, phone });
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.data & e.response.data.message)
        setError(e.response.data.message);
      else
        setError(
          "Ocurrio un error, por favor Intente de nuevo o llame al 1334"
        );
    }
  };

  return (
    <div>
      <Typography
        component="h6"
        variant="caption"
        align="left"
        color="textPrimary"
        gutterBottom
      >
        Teléfono Ingresado: {props.state.user.pais} {props.state.user.phone}
      </Typography>

      <div className={classes.root}>
        <Box m={2} ml={3} mr={3}>
          <FormLabel component="legend">Datos del Paciente</FormLabel>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Edad del paciente
            </InputLabel>
            <Select
              native
              variant="filled"
              gutterBottom
              fullWidth
              inputProps={{
                name: "edad",
                id: "filled-age-native-simple"
              }}
              value={age}
              onChange={e => {
                setError(null);
                setAge(e.target.value);
              }}
            >
              <option value={"0-2"}>0-2</option>
              <option value={"3-12"}>3-12</option>
              <option value={"12-29"}>12-29</option>
              <option value={"29-50"}>29-50</option>
              <option value={"50-70"}>50-70</option>
              <option value={"70+"}>70+</option>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
