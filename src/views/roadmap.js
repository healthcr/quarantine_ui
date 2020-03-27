import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Hero from "../components/hero";
import Paywall from "../components/paywall";

import { useStore } from "business/hooks/useStore";
import { useGet } from "business/hooks/useGet";

import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  table: { width: 800 }
}));

export default function Album() {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { get, response, loading, error } = useGet();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Typography
          component="h6"
          variant="h6"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Proyecto Colibrí
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="subtitle2"
          align="left"
          gutterBottom
        >
          En esta seccion encontrará el roadmap, presupuesto y plan de
          divulgación. <br />
          <br />
          En general la divulgación se realizará primero via SMS con el ICE y
          posteriormente via WhatsApp para reducir costos.
        </Typography>

        <Box mt={3}>
          <SimpleTable />
        </Box>
        <Box mt={3}>
          <BudgetTable />
        </Box>
        <Box mt={3}>
          <Typography
            component="h6"
            variant="h6"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Plan Divulgación
          </Typography>

          <Typography
            style={{ marginBottom: 20 }}
            component="h6"
            variant="body2"
            align="left"
            color="textSecondary"
            gutterBottom
          >
            1. Incorporar la información de casos confirmados en tiempo real en
            el app web y nativo, para generar tráfico y conexiones.
          </Typography>

          <Typography
            style={{ marginBottom: 20 }}
            component="h6"
            variant="body2"
            align="left"
            color="textSecondary"
            gutterBottom
          >
            2. Priorizar el aspecto digital en las conferencias de prensa y
            comunicaciones oficiales. Con el fin de incorporar a la ciudadania
            en la adopción del programa digital y la participación ciudadana a
            través de la tecnología.
          </Typography>

          <Typography
            style={{ marginBottom: 20 }}
            component="h6"
            variant="body2"
            align="left"
            color="textSecondary"
            gutterBottom
          >
            3. Incorporar a todos los influencers del país en la campaña digital
            (Youtube, Instagram, FB, Whatsapp, Spotify, Google Ads) de
            instalación del app Android/iOS de tracking voluntario, con el
            objetivo de aplicar el modelo exitoso de tracking digital de
            contactos de Corea del Sur. (Esto puede ser anonimizado, auditado
            por terceros, a responsabilidad política de nuestro equipo)
          </Typography>
        </Box>
        <Typography
          component="h6"
          variant="h6"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Sistema 99.9995% Disponibilidad
        </Typography>

        <Box m={1}>
          <a href="http://docs.coronacr.org/diagrama.pdf" target="_blank">
            Diagrama de Flujos
          </a>
        </Box>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          1. Cloud Based - pay per use para 10 millones de usuarios activos.
        </Typography>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          2. Staging & Production para pruebas y desarrollo continuo. (varias
          versiónes nuevas/día)
        </Typography>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          3. Redundante Geográficamente (EUA,UE,Singapur)
        </Typography>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          4. Escalabilidad y Desescalabilidad automatizada, Automatic Failover,
          Back-up cada 3 minutos
        </Typography>

        <Typography
          component="h6"
          variant="caption"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Creado por 3 costarricenses:
          <br /> Roberto Artavia
          <br /> Roberto Echeverría
          <br /> Roberto Rodríguez
        </Typography>
        <small>
          Open Source, Citizen Crowd Sourcing, IP para OMS Patent Fund
        </small>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="subtitle2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          El proyecto tecnológico más ambioso de la historia costarricense. El
          más importante sin duda.
          <br />
        </Typography>
      </main>
    </React.Fragment>
  );
}

function SimpleTable() {
  const classes = useStyles();

  const createData = function(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData("Web v.1", "30 Marzo", "Pre-Diagnostico", "", 4.0),
    createData(
      "Tracking App v.1",
      "4 Abril",
      "App c/GPS cuarentena & tracing digital",
      "",
      4.3
    ),
    createData(
      "1 millon SMS/día ",
      "4 Abril",
      "Envio masivo de SMS's",
      "ICE",
      4.3
    ),
    createData(
      "Reunión Korea",
      "5 Abril",
      "Intercambió Experiencias Korea Tech",
      "",
      4.3
    ),
    createData(
      "Reunión Singapure",
      "5 Abril",
      "Intercambió Experiencias Singapure/Taiwan",
      "",
      4.3
    ),
    createData(
      "Plan Divulgación",
      "6 Abril",
      "Impacto Mercadeo Masivo 24/7",
      "+,- ",
      3.9
    ),
    createData(
      "Robot de Voz ",
      "10 Abril",
      "Llamadas (monitoreo)",
      "SI!",
      49,
      3.9
    ),
    createData(
      "Comando Digital v.1",
      "10 Abril",
      "Dashboard p/ Testing & Hospitales",
      24,
      6.0
    ),
    createData(
      "WhatsApp Business",
      "20 Abril",
      "Cambio SMS por Whats App $--",
      "ICE?",
      49,
      3.9
    ),
    createData(
      "24 millones SMS/día ",
      "30 Abril",
      "Envio Masivo de SMS's",
      "SI!",
      67,
      4.3
    ),

    createData("Web 2.0", "Abril 25", "TBD", "", 3.9),
    createData("App 2.0", "Abril 30", "TBD", "", 3.9)
  ];

  return (
    <TableContainer component={Paper}>
      <Box p={2}>
        <Typography
          component="h6"
          variant="h6"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Roadmap
        </Typography>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Componente</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}

function BudgetTable() {
  const classes = useStyles();

  const createData = function(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData("Etapa 1", "30 Marzo-10 Abril", "$1,000", "Heroku+Twilio", 4.0),
    createData("Etapa 2", "10 Abril-15 Abril", "$10,000", "AWS+Twilio", 4.0),
    createData("Etapa 3", "15 Abril-30 Abril", "$50,000", "AWS+Twilio", 4.0),
    createData("Etapa 4", "1 Mayo-30 Mayo++", "$150,000", "AWS+Twilio", 4.0)
  ];

  return (
    <TableContainer component={Paper}>
      <Typography
        style={{ marginBottom: 20 }}
        component="h6"
        variant="body2"
        align="left"
        color="textSecondary"
        gutterBottom
      >
        Presupuesto para cubrir los costos operativos de servidores, bases de
        datos, mensajes de texto y voz, y componentes de soporte para esos
        servicios. No se comisiona ni obtienen ganancias - se fue explícito con
        los tres.
        <div>
          <a href="https://www.heroku.com/pricing">
            https://www.heroku.com/pricing
          </a>
        </div>
        <div>
          <a href="https://www.twilio.com/pricing">
            https://www.twilio.com/pricing
          </a>
        </div>
        <div>
          <a href="https://aws.amazon.com/es/pricing/">
            https://aws.amazon.com/es/pricing
          </a>
        </div>
      </Typography>

      <Box p={2}>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          El costo mas elevado es el de los mensajes de texto SMS. Negociando
          con el ICE o moviendonos a Whats App ( con un proceso muy urgente ),
          es posible recortar una gran mayoria de los costos.
        </Typography>
      </Box>

      <Box p={2}>
        <Typography
          component="h6"
          variant="h6"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Costos de operación por etapa
        </Typography>

        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Los costos aquí mostrados corresponden a operación en la nube bajo
          modalidad $0.0001/segundo-servidor, $0,004/envio-sms $0.003/minuto-voz
        </Typography>
        <Typography
          style={{ marginBottom: 20 }}
          component="h6"
          variant="body2"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Estoy negociando con los provedores{" "}
          <a target="_blank" href="https://aws.amazon.com/">
            Amazon AWS
          </a>{" "}
          <a target="_blank" href="https://twilio.com/">
            Twilio
          </a>{" "}
          <a target="_blank" href="http://www.heroku.com">
            Heroku
          </a>{" "}
          pero necesitamos el respaldo por escrito del Gobierno para negociar
          (no son contratos son costos ). El ICE nos puede reducir el 80% de los
          costos de SMS.
          <br />
          Las telefónicas también deberían liberar el cobro de datos para
          internet celular desde http://coronacr.org
        </Typography>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Etapa</TableCell>

              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Presupuesto</TableCell>
              <TableCell align="right">Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
