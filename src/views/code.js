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
import ClienteList from "./clienteList";

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
  }
}));

export default function CustomerAsynchronous(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onCheckCedula = async function() {
    try {
      setLoading(true);
      props.onSend(cedula, telefono);
    } catch (e) {
      setError("Por favor Intente de nuevo");
    }
    setLoading(false);
  };

  const onResend = async function() {
    try {
      setLoading(true);
      props.onSend(cedula, telefono);
    } catch (e) {
      setError("Por favor Intente de nuevo");
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography
        component="h6"
        variant="h6"
        align="left"
        color="textPrimary"
        gutterBottom
      >
        Ingrese el código que le enviamos a su celular
      </Typography>

      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        value={phone}
        onChange={e => {
          setError(null);
          setCode(e.currentTarget.value);
        }}
        id="cedula"
        name="cedula"
        label="Cedula Jurídica o Física"
        fullWidth
      />

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
        <Button color="primary" onClick={onSend} variant="contained">
          Ingresar
        </Button>
      )}

      <Typography
        component="h6"
        click={onResend}
        variant="caption"
        align="left"
        color="textPrimary"
        gutterBottom
      >
        No me llegó el mensaje, envíelo de nuevo
      </Typography>
    </div>
  );
}
