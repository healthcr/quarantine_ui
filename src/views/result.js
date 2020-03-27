import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Hero from "../components/hero";

import DiagnosisResult from "../components/diagnosisResult";

import { useStore } from "business/hooks/useStore";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, yellow, green, orange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { LinearProgress } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

import { useGet } from "../business/hooks/useGet";

const useStyles = makeStyles(theme => ({}));

export default function Album(props) {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const [innerView, setInnerView] = React.useState("500");
  const [scoreRange, setScoreRange] = React.useState("100");

  React.useEffect(() => {
    if (state.paciente.score < 200) setScoreRange("100");
    else if (state.paciente.score < 300) setScoreRange("200");
    else if (state.paciente.score < 500) setScoreRange("500");
    else if (state.paciente.score >= 500) setScoreRange("700");
  }, [state.paciente.score]);

  const onBack = () => {
    dispatch({ type: "setView", payload: "DIAGNOSIS" });
  };

  const onNext = () => {
    dispatch({ type: "setView", payload: "ROADMAP" });
  };

  const onShow = range => {
    return () => {
      setScoreRange(range);
    };
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [scoreRange]);

  const calm = () => {
    return (
      <CardContent>
        <Typography paragraph>
          <strong>
            Aqui van los consejos medicos para pacientes asustados sin riesgo.
          </strong>
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Ej: Le recomendamos practicar tecnicas de relajacion, como respirar
          profundo contar hasta 4, sostener el aire y contar hasta 7 y botarlo
          contando hasta 8. Tambien puede descargar apps como Calm o Mindfulness
          para aprender otras tecnicas de relajación.
        </Typography>

        <Box m={1}>
          <Button
            style={{ marginBottom: 10 }}
            color="primary"
            onClick={onNext}
            fullWidth
            variant="contained"
          >
            Ver Roadmap y Timeline
          </Button>
        </Box>
      </CardContent>
    );
  };

  const mild = () => {
    return (
      <CardContent>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          <strong>
            {" "}
            Aqui van los consejos medicos para pacientes con potencial
            coronavirus leve.
          </strong>
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Estos pacientes seran monitoreados de forma automatica a diario via
          SMS - Voz. Hasta que no reporten sintomas.
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Tambien se le dara seguimiento a su ubicación GPS y en caso necesario
          se le daran consejos amigables para despertar su consiencia.
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          De no dar resultado se usaran las alertas del Dashboard del Comando
          Digital ( programa Desktop ) para atender el caso legalmente, se puede
          notificar via SMS's / Voz a Fuerza Publica, vecinos, voluntarios, etc.
        </Typography>

        <Tracker
          dispatch={dispatch}
          state={state}
          message={"Esto nos ayudara a atender mejor a su comunidad"}
        />
        <Box m={1}>
          <Button
            style={{ marginBottom: 10 }}
            color="primary"
            onClick={onNext}
            fullWidth
            variant="contained"
          >
            Ver Roadmap y Timeline
          </Button>
        </Box>
      </CardContent>
    );
  };

  const hospital = () => {
    return (
      <CardContent>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          <strong>
            Aqui van los consejos medicos para una persona que debe ir al
            hospital o a realizarse una prueba.
          </strong>
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Es esencial contar con la ubicación y estado de saturación de los
          centros medicos para poder dirigir a los pacientes y optimizar los
          recuersos medicos. Esta es la primera razón de existir del sistema.
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Es realista contar con un sistema de videollamada desde el App o
          incluso via Whats App para consultad de este tipo. Covid-19
          unicamente.
        </Typography>

        <Tracker
          dispatch={dispatch}
          state={state}
          message={"Si no logramos ubicarla dirijase al hospital mas cercano"}
        />
        <Box m={1}>
          <Button
            color="primary"
            onClick={onNext}
            fullWidth
            variant="contained"
          >
            Ver Roadmap y Timeline
          </Button>
        </Box>

        <Box m={1}>
          <p>Pronto</p>
          <Button disabled fullWidth color="primary" variant="contained">
            Realizar Videollamada
          </Button>
        </Box>
      </CardContent>
    );
  };

  const emergencia = () => {
    return (
      <CardContent>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          <strong>
            Aqui van los consejos medicos para una persona que debe ir al
            hospital de emergencia
          </strong>
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Se pueden tomar muchas acciones automaticas con cruz roja y otros pero
          estas responsablemente deben ser coordinadas en conjunto con
          profesionales de varias ramas. En primera instancia se le informa al
          paciente adonde dirigirse.
        </Typography>

        <div>
          <Tracker
            dispatch={dispatch}
            state={state}
            message={"Si no logramos ubicarla dirijase al hospital mas cercano"}
          />
        </div>

        <Box m={1}>
          <Button
            color="primary"
            onClick={onNext}
            fullWidth
            variant="contained"
          >
            Ver Roadmap y Timeline
          </Button>
        </Box>

        <p>Pronto ( Etapa #3 )</p>
        <Box m={1}>
          <Button disabled color="secondary" fullWidth variant="contained">
            Notificar 911 - Enviar Ambulancia
          </Button>
        </Box>
        <Box m={1}>
          <Button disabled fullWidth color="secondary" variant="contained">
            Voy por mis propios medios
          </Button>
        </Box>
      </CardContent>
    );
  };

  const statusMap = {
    "100": {
      color: green[500],
      label: "Tranquilo",
      message: "Usted no esta en riesgo, practique distanciamiento social.",
      card: calm
    },
    "200": {
      color: yellow[500],
      label: "Posible Contagio",
      message:
        "Es probable que este contagiado, pero sus sintomas son leves. Necesitamos monitorearlo",
      card: mild
    },
    "500": {
      color: orange[500],
      label: "ATENCION",
      message: "Usted esta en riesgo. Dirijase a su hospital mas cercano",
      card: hospital
    },
    "700": {
      color: red[500],
      label: "PELIGRO",
      message:
        "Dirijase inmediatamente al hospital mas cercano. Va recibir una llamada.",
      card: emergencia
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <DiagnosisResult
          diagnostic={statusMap[scoreRange]}
          state={state}
          onBack={() => {
            dispatch({ type: "setView", payload: "DIAGNOSIS" });
          }}
          onNext={() => {
            setInnerView("IDENTIFY");
          }}
        />

        <Box mt={5}>
          <Typography
            style={{ marginBottom: 20 }}
            component="h6"
            variant="body2"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Como se ven los otros casos?
          </Typography>
        </Box>
        <Box flex alignItems="center" alignContent="center" mt={2} ml={3}>
          <Chip
            style={{ marginRight: 5 }}
            label="Sano"
            color="primary"
            variant={scoreRange == "100" ? "contained" : "outlined"}
            onClick={onShow("100")}
          />
          <Chip
            style={{ marginRight: 5 }}
            label="Leve"
            color="primary"
            variant={scoreRange == "200" ? "contained" : "outlined"}
            onClick={onShow("200")}
          />
          <Chip
            style={{ marginRight: 5 }}
            label="Enfermo"
            color="primary"
            variant={scoreRange == "500" ? "contained" : "outlined"}
            onClick={onShow("500")}
          />
          <Chip
            style={{ marginRight: 5 }}
            label="Emergencia"
            color="primary"
            variant={scoreRange == "700" ? "contained" : "outlined"}
            onClick={onShow("700")}
          />
        </Box>
      </main>
    </React.Fragment>
  );
}

const Tracker = props => {
  const [location, setLocation] = React.useState(null);
  const [gps, setGps] = React.useState(null);

  const { get, response, loading } = useGet();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      location => {
        setGps(location.coords);
        (async () => {
          var data = await get({
            path: "patients/geocode",
            query: `latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          });

          if (data.coords.results[0]) {
            setLocation(data.coords.results[0]);
            props.dispatch({
              type: "updatePaciente",
              payload: {
                city: "",
                state: data.coords.results[0].components.state,
                sector: ""
              }
            });
          } else setLocation(false);
        })();
      },
      () => {
        setLocation(false);
      }
    );
  }, []);

  return (
    <div>
      {location == null && (
        <div>
          <p>"Buscando su ubicación {props.message}</p>
          {loading && <LinearProgress fullWidth />}
        </div>
      )}
      {location == false && (
        <div>
          <p>
            No logramos encontrar su ubicación actual con GPS, esta es su
            ubicación electoral:
            {props.state.paciente.state} {props.state.paciente.city}{" "}
            {props.state.paciente.sector}
          </p>
        </div>
      )}
      {location != false && location != null && (
        <div>
          <p>Esta es su ubicación</p>
          {props.state.paciente.state}
          <br />
          <br />
          Lat: {gps.latitude} - Long: {gps.longitude}
        </div>
      )}
    </div>
  );
};
