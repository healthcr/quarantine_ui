import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "90%",
    marginLeft: "5%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: props.diagnostic.color
            }}
            aria-label="recipe"
            className={classes.avatar}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.diagnostic.label}
        subheader={
          <a style={{ textTransform: "capitalize" }}>
            {props.state.paciente.name || new Date().toDateString()}
          </a>
        }
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.diagnostic.message}
        </Typography>
      </CardContent>

      <Box m={2} ml={3} p={2} color="info.main" mr={3} border={1}>
        <Typography
          component="h6"
          variant="body2"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Le enviaremos un mensaje de texto
          <br />
          <small>Asegúrese de haber ingresado correctamente su número</small>
        </Typography>
      </Box>
      {props.diagnostic.card()}
    </Card>
  );
}
