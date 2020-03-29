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
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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
    marginBottom: 25
  }
}));

export default function CustomerAsynchronous(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [ssn, setSsn] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [relationship, setRelationship] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState("NACIONAL");

  const onLogin = () => {
    props.onLogin({ phone, pais });
  };

  React.useEffect(() => {
    setPhone(props.state.user.phone);
    setPais(props.state.user.pais || "505");
    setSsn(props.state.user.ssn);
  }, [props.state.user]);

  return (
    <div>
      <Typography
        component="h6"
        variant="h6"
        align="left"
        color="textPrimary"
        gutterBottom
      >
        Punto de Ingreso
      </Typography>

      <div className={classes.root}>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Este es el canal principal de ingreso al sistema. Su valor inicial es
          ser una herramienta de pre-diagnóstico que le indica a la persona que
          acciones tomar segun sus síntomas. <br />
          <i>Su finalidad es optimizar los recursos del sistema de salud.</i>
        </Typography>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Cuando la persona ingresa su teléfono celular se inicia un proceso de
          monitoreo automático a largo plazo desde el comando digital. Esto
          incluye SMS's, llamadas "robóticas" y análisis con AI (etapa #3).
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Las personas ingresarán aquí a través del programa de divulgación,
          pero sobretodo, a través de 20 millones de SMS's con links enviados
          masivamente todos los días con información actualizada y relevante
          para cada persona. Van a ser muy esperados!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">País</InputLabel>
              <Select
                native
                gutterBottom
                fullWidth
                inputProps={{
                  name: "pais",
                  id: "filled-pais-native-simple"
                }}
                value={pais}
                onChange={e => {
                  setError(null);
                  setPais(e.target.value);
                }}
              >
                <option value={"506"}>Costa Rica</option>
                <option value={"505"}>Nicaragua</option>
                <option value={"504"}>Honduras</option>
                <option value={"503"}>El Salvador</option>
                <option value={"502"}>Guatemala</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              className={classes.formControl}
              gutterBottom
              variant="outlined"
              autoFocus
              margin="dense"
              value={phone}
              onChange={e => {
                setError(null);
                setPhone(e.currentTarget.value);
              }}
              id="phone"
              type="number"
              name="phone"
              label="Telefono celular"
            />
          </Grid>
        </Grid>
      </div>

      {loading ? (
        <Box m={2}>
          <LinearProgress color="primary" size={30} />
        </Box>
      ) : null}

      {error && (
        <Box
          textAlign="center"
          className={classes.error}
          border={1}
          p={1}
          m={1}
        >
          {error}
        </Box>
      )}

      {loading ? null : (
        <div>
          <Button
            className={classes.formControl}
            style={{ marginLeft: 5 }}
            color="primary"
            onClick={onLogin}
            variant="contained"
          >
            Ingresar
          </Button>
          <FormHelperText label="Su numero no se guarda, no lo estaremos molestando">
            Su número no se guardará
          </FormHelperText>
        </div>
      )}
    </div>
  );
}
