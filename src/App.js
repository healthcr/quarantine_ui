import React from "react";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import { useStore } from "business/hooks/useStore";
import Hero from "./components/hero";

import Login from "./views/login";
import Paywall from "./views/paywall";
import Diagnosis from "./views/diagnosis";
import Roadmap from "./views/roadmap";

import Result from "./views/result";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  main: {
    margin: 10,
    paddingTop: 60
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

export default function App() {
  const classes = useStyles();

  const [cliente, setCliente] = React.useState(null);
  const [modalView, setModalView] = React.useState("CLIENTE");
  const [showContact, setShowContact] = React.useState(false);
  const [showDone, setShowDone] = React.useState(false);
  const [contact, setContact] = React.useState(null);
  const [recomendedProducts, setRecomendedProducts] = React.useState([]);
  const [selectedProducto, setSelectedProducto] = React.useState(null);

  const { state, dispatch } = useStore();

  React.useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  const loadProducts = async () => {
    const jsonResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/clientesInfo?clienteId=${cliente.id}`
    );

    setRecomendedProducts(jsonResponse.data.movimientos);
  };

  React.useEffect(() => {
    if (cliente) loadProducts();
  }, [cliente]);

  const onSelectProducto = productos => {
    var ids = recomendedProducts.map(p => p.id);
    setRecomendedProducts([
      ...recomendedProducts,
      ...productos.filter(item => ids.indexOf(item.id) == -1)
    ]);
    setSelectedProducto(null);
  };

  const onSelectCliente = cliente => {
    setCliente(cliente);
    setModalView("PRODUCT");
  };

  const onProductoChange = (producto, cantidad) => {
    if (cantidad == "" || cantidad.length == 0) cantidad = 0;
    cantidad = parseFloat(cantidad);
    var newProducts = recomendedProducts.map(item => {
      if (item.id == producto.id) item.cantidad = cantidad;
      return item;
    });
    setRecomendedProducts([...newProducts]);
  };

  const onHandleContact = contact => {
    setContact(contact);

    setModalView("CONFIRM");
  };

  const handleConfirm = async details => {
    const jsonResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/confirm`,
      {
        cliente: cliente,
        items: recomendedProducts.filter(
          item => parseFloat(item.cantidad) > 0 == true
        ),
        contact,
        details
      }
    );

    setModalView("DONE");
    setContact(null);
    setCliente(null);
    setSelectedProducto(null);
    setRecomendedProducts([]);
  };

  const onEnviar = e => {
    if (!contact) setModalView("CONTACT");
    else setModalView("CONFIRM");
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Hero />

      <main className={classes.main}>
        {state.app.view == "PAYWALL" && <Paywall />}
        {state.app.view == "LOGIN" && <Login />}
        {state.app.view == "DIAGNOSIS" && <Diagnosis />}
        {state.app.view == "RESULT" && <Result />}
        {state.app.view == "ROADMAP" && <Roadmap />}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        ></Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        coronacr.org
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
