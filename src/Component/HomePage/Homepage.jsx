import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Skeleton from "@material-ui/lab/Skeleton";
import { NavLink } from "react-router-dom";
import { serverUrl } from "../config";
import { useHttpHandler } from "../Handler/httpHandler";
import { isLogin } from "../ReactMiddleware/reactAuth";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function CheckLogin() {
  return isLogin;
}

export default function HomePage() {
  const classes = useStyles();

  const { isLoading, error, sendRequest, errorPopupCloser } = useHttpHandler();
  const [loadedLocations, setLoadedLocations] = useState();

  useEffect(() => {
    // we have use useEffect hook to stop the infinite loop. otherwise fetch will rerender to all the changes.
    const fetchLocations = async () => {
      // this method is only to use the async code. we can't use async directly on the useEffect hook. useEffect is not good for promisses.

      axios
      .get(serverUrl + "/locations/")
      .then((response) => {
        setLoadedLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    };
    fetchLocations();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Book Your Reservations
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              You can create book any given location using Travel Lanka. We are
              the only tourism agancy, that offers you this sort of experiance.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {!isLogin() ? (
                    <NavLink to="/signup">
                      <Button variant="contained" color="primary">
                        Create New Account
                      </Button>
                    </NavLink>
                  ) : (
                    <NavLink to="/add-trip">
                      <Button variant="contained" color="primary">
                        Plan New Trip
                      </Button>
                    </NavLink>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          {loadedLocations && !isLoading && (
            <Grid container spacing={4}>
              {loadedLocations.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.locationUrl}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>{card.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {/* loding Skelton */}
          {isLoading && (
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <Skeleton
                      animation="wave"
                      height={160}
                      variant="rect"
                      className={classes.media}
                    />
                    <CardContent className={classes.cardContent}>
                      <React.Fragment>
                        <Skeleton
                          animation="wave"
                          height={10}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={10} width="80%" />
                      </React.Fragment>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Travel Lanka
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Your Travel Partner.
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
