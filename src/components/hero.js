import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useGet } from "business/hooks/useGet";
import Box from "@material-ui/core/Box";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    lineHeight: "40px",
    fontSize: 20,

    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Hero(props) {
  const classes = useStyles();

  const [cases, setCases] = React.useState(0);

  const { get, response, loading, error } = useGet(
    "https://coronavirus-19-api.herokuapp.com/countries/costa"
  );

  React.useEffect(() => {
    (async () => {
      var res = await get({ path: "" });
      console.log(res);
      setCases(res);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <img src="./logo192.png" style={{ width: 50 }}></img>
          <Typography variant="h6" className={classes.title}>
            coronacr.org
          </Typography>
          <Button color="inherit">
            Casos: {cases.cases}+{cases.todayCases}{" "}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
