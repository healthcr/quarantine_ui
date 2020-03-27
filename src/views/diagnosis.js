import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Hero from "../components/hero";
import Diagnosis from "../components/diagnosis";
import Typography from "@material-ui/core/Typography";

import DiagnosisResult from "../components/diagnosisResult";
import PatientDetails from "../components/patientDetails";

import Identify from "../components/identify";

import { usePost } from "../business/hooks/usePost";

import { useStore } from "business/hooks/useStore";

const useStyles = makeStyles(theme => ({}));

export default function Album(props) {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const [innerView, setInnerView] = React.useState("SIMTOMPS");

  const { response, loading, error, post } = usePost();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {innerView == "SIMTOMPS" && (
          <div>
            <Typography
              component="h6"
              variant="h6"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Herramienta de Diagnostico
            </Typography>

            <Typography
              style={{ marginBottom: 20 }}
              component="h6"
              variant="body2"
              align="left"
              color="textSecondary"
              gutterBottom
            >
              Demo: Seleccione varios síntomas, asegúrese de seleccionar los de
              una enfermedad leve como mínimo para que reciba la experiencia
              completa. <br />
              <br />
              <strong>
                El sistema utiliza la fórmula de John Hopkings y sera coordinada
                con los parámetros de la CCSS y EDUS.
              </strong>
            </Typography>

            <PatientDetails state={state} />

            <Diagnosis
              state={state}
              onNext={({ score, checked }) => {
                dispatch({
                  type: "updatePaciente",
                  payload: { score, checked }
                });
                setInnerView("IDENTIFY");
              }}
            />
          </div>
        )}

        {innerView == "IDENTIFY" && (
          <div>
            <Identify
              state={state}
              onNext={async ({
                pacienteRelacion,
                pacientePhone,
                pacientePhoneDetails,
                estadoLegal,
                ssn,
                pacienteName
              }) => {
                dispatch({
                  type: "updatePaciente",
                  payload: {
                    pacienteRelacion,
                    pacientePhone,
                    pacientePhoneDetails,
                    estadoLegal,
                    ssn,
                    pacienteName
                  }
                });
                dispatch({ type: "setView", payload: "RESULT" });

                try {
                  var patientResponse = await post({
                    path: "patients/notify",
                    body: {
                      pais: state.user.pais,
                      phone: state.user.phone,
                      ssn: ssn,
                      score: state.paciente.score
                    }
                  });

                  dispatch({
                    type: "updatePaciente",
                    payload: {
                      name: patientResponse.patient.name,
                      state: patientResponse.patient.state,
                      city: patientResponse.patient.city,
                      sector: patientResponse.patient.sector
                    }
                  });
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
