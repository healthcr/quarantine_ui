import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/box";
import Button from "@material-ui/core/button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: theme.spacing(3),
    width: "100%"
  }
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [score, setScore] = React.useState(0);
  const [checked, setChecked] = React.useState({});
  const [error, setError] = React.useState(null);

  const onNext = () => {
    props.onNext({ score, checked });
  };

  const handleChange = value => {
    return event => {
      var newChecked = { ...checked };
      if (checked[event.target.name]) {
        delete newChecked[event.target.name];
        setScore(score - value);
      } else {
        newChecked[event.target.name] = true;
        setScore(score + value);
      }
      setChecked(newChecked);
    };
  };

  const symptoms = [
    { name: "sano", descripction: "Sin Sintomas", score: 0 },
    { name: "fiebre", descripction: "Fiebre mas 37.7 grados", score: 100 },
    { name: "tos", descripction: "Tos Seca Persistente", score: 50 },
    { name: "garganta", descripction: "Dolor de Garganta", score: 50 },
    { name: "olfato", descripction: "Perdida de Olfato o Gusto", score: 150 },
    { name: "cansacio", descripction: "Cansancio Incapacitante", score: 150 },
    { name: "cabeza", descripction: "Dolor de Cabeza", score: 50 },
    { name: "sputum", descripction: "Flemas en los pulmones", score: 150 },
    { name: "gato", descripction: "Silbido o Gato al respirar", score: 250 },
    { name: "pecho", descripction: "Dolor de Pecho", score: 350 },
    { name: "mareo", descripction: "Mareo o Confusión", score: 100 }
  ];

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Escoja sus síntomas</FormLabel>

        {symptoms.map(s => {
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox name={s.name} onChange={handleChange(s.score)} />
                }
                label={s.descripction}
              />
            </FormGroup>
          );
        })}
      </FormControl>
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

      <Typography
        style={{ marginBottom: 20 }}
        component="h6"
        variant="body2"
        align="left"
        color="textSecondary"
        gutterBottom
      >
        Escoja varios síntomas graves para que pueda experimentar las
        tecnologías
      </Typography>
      <br />

      <Button
        style={{ marginLeft: 20 }}
        color="primary"
        onClick={onNext}
        variant="contained"
      >
        Siguiente
      </Button>
    </div>
  );
}
