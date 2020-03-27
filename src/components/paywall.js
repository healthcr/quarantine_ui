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
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
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
    marginBottom: 15
  },

  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function CustomerAsynchronous(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [clave, setClave] = React.useState(
    window.localStorage.getItem("clave") || ""
  );
  const [relationship, setRelationship] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState("NACIONAL");

  const onClick = () => {
    if (clave == "0") {
      window.localStorage.setItem("clave", clave);
      props.next();
    } else {
      window.localStorage.setItem("clave", "");
      setError("La clave de acceso no es correcta");
    }
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
        Comando Digital COVID-19
        <StyledBadge badgeContent={"Demo"} color="primary"></StyledBadge>
      </Typography>

      <div className={classes.root}>
        <Typography
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Este es el componente web del sistema propuesto para enfrentar con
          tecnología la amenaza del COVID-19.
        </Typography>

        <Typography
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          El sistema tiene 8 componentes, aquí se demuestran 4 tecnologías
          enfocadas en cubrir al 100% a quienes estamos en CR.
        </Typography>

        <Typography
          component="h6"
          variant="caption"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Es creado por una alianza internacional aún en formación llamada
          Proyecto Colibrí.
        </Typography>

        <TextField
          className={classes.formControl}
          gutterBottom
          variant="outlined"
          autoFocus
          margin="dense"
          value={clave}
          onChange={e => {
            setClave(e.target.value);
          }}
          id="clave"
          type="number"
          name="Clave"
          label="Ingrese la clave"
        />
      </div>

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
        <Button
          style={{ marginLeft: 20 }}
          color="primary"
          onClick={onClick}
          variant="contained"
        >
          Ingresar
        </Button>
      )}
    </div>
  );
}

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: -15,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);
