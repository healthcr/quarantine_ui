import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
  }
}));

export default function CustomerAsynchronous(props) {
  const classes = useStyles();

  const [error, setError] = React.useState(null);
  const [ssn, setSsn] = React.useState("");
  const [pacienteRelacion, setPacienteRelacion] = React.useState("PERSONAL");
  const [pacientePhone, setPacientePhone] = React.useState("");
  const [pacientePhoneDetails, setPacientePhoneDetails] = React.useState("");
  const [pacienteName, setPacienteName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [estadoLegal, setEstadoLegal] = React.useState("CIUDADANO/RESIDENTE");

  const onLogin = async () => {
    props.onNext({
      pacienteRelacion,
      pacientePhone,
      pacientePhoneDetails,
      estadoLegal,
      ssn,
      pacienteName
    });
  };

  React.useEffect(() => {
    setPacientePhone(props.state.user.phone);
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
        Identificación del Paciente
      </Typography>

      <div className={classes.root}>
        <Typography
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Los campos a ingresar cambian según las selecciones para que el
          ingreso de datos sea intuitivo y no obstaculize a la persona durante
          una emergencia.
        </Typography>
        <Typography
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Utilizamos un modelo de "eventual consistency", lo que nos interesa es
          recibir la mayor cantidad de información posible. Posteriormente, un
          algoritmo "robótico" intenta conectar la identidad de la persona con
          las bases de datos disponibles públicas y médicas.
        </Typography>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Quién es el paciente?
          </InputLabel>
          <Select
            native
            variant="filled"
            gutterBottom
            fullWidth
            inputProps={{
              name: "relacion",
              id: "filled-relacion-native-simple"
            }}
            value={pacienteRelacion}
            onChange={e => {
              setError(null);
              setPacienteRelacion(e.target.value);
            }}
          >
            <option value={"PERSONAL"}>Yo</option>
            <option value={"DEPENDIETE"}>Hijo o Menor de Edad</option>
            <option value={"FAMILIAR"}>Adulto Mayor</option>
            <option value={"OTRO"}>Otro</option>
          </Select>
        </FormControl>
        {"PERSONAL" != pacienteRelacion && (
          <div>
            <TextField
              className={classes.formControl}
              variant="outlined"
              autoFocus
              type="text"
              margin="dense"
              value={pacienteName}
              onChange={e => {
                setError(null);
                setPacienteName(e.currentTarget.value);
              }}
              id="pacienteName"
              name="pacienteName"
              label="Nombre del Paciente"
              fullWidth
            />

            {["DEPENDIETE", "PERSONAL"].indexOf(pacienteRelacion) == -1 && (
              <div>
                <TextField
                  className={classes.formControl}
                  variant="outlined"
                  autoFocus
                  type="text"
                  margin="dense"
                  value={pacientePhoneDetails}
                  onChange={e => {
                    setError(null);
                    setPacientePhoneDetails(e.currentTarget.value);
                  }}
                  id="pacienteContactDetails"
                  name="pacienteContactDetails"
                  label="Instrucciones de Contacto"
                  fullWidth
                />
              </div>
            )}
          </div>
        )}
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Estado migratorio del <strong>paciente</strong>
          </InputLabel>
          <Select
            native
            variant="filled"
            gutterBottom
            fullWidth
            inputProps={{
              name: "estadoLegal",
              id: "filled-estado-legal-native-simple"
            }}
            value={estadoLegal}
            onChange={e => {
              setError(null);
              setEstadoLegal(e.target.value);
            }}
          >
            <option value={"CIUDADANO/RESIDENTE"}>Ciudadano</option>
            <option value={"EXTRANJERO"}>Extranjero</option>
          </Select>
        </FormControl>
        <TextField
          className={classes.formControl}
          variant="outlined"
          autoFocus
          type="number"
          margin="dense"
          value={ssn}
          onChange={e => {
            setError(null);
            setSsn(e.currentTarget.value);
          }}
          id="ssn"
          name="ssn"
          label={
            "CIUDADANO/RESIDENTE" == estadoLegal
              ? "Identificación"
              : "Pasaporte"
          }
          fullWidth
        />
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
        <Button
          style={{ marginLeft: 20 }}
          color="primary"
          onClick={onLogin}
          variant="contained"
        >
          Obtener Instrucciones
        </Button>
      )}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
