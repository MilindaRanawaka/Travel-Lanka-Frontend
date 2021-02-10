import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { login } from "../ReactMiddleware/reactAuth";
import { serverUrl } from "../config";

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1537551080512-fb7dd14fbf90?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=sander-don-sGg_8msiIt0-unsplash.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserLogin() {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    msg: "",
    showForm: true,
  });

  const { email, password, error, loading, msg, showForm } = values;

  const onChangeHandler = (inputFieldName) => (e) => {
    setValues({
      ...values,
      error: false,
      [inputFieldName]: e.target.value,
      loading: true,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.table(values);
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(serverUrl + "/users/", user)
      .then((response) => {
        //Redirect to page
        login(response.data.token, response.data.user);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error.response);
        toast("Please Check Email or Password");
      });
  };

  return (
    <Grid container marginTop={"0px"} component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={onChangeHandler("email")}
                  value={email}
                  error={error ? true : false}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={error}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChangeHandler("password")}
                  value={password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error} <strong>check it out!</strong>
                  </Alert>
                </Grid>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
