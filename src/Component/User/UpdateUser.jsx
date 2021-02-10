import React, { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { serverUrl, TOKEN_ID } from "../config";

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=hendrik-cornelissen-jpTT_SAU034-unsplash.jpg&w=1920)",
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UpdateUser() {
  const classes = useStyles();

  const mounted = useRef();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    msg: "",
    showForm: true,
  });

  useEffect(() => {
    if (!mounted.current) {
      axios
        .get(serverUrl + "/users/" + localStorage.getItem(TOKEN_ID))
        .then((response) => {
          setValues({
            ...values,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      mounted.current = true;
    }
  });

  const {
    firstName,
    lastName,
    email,
    password,
    error,
    loading,
    msg,
    showForm,
  } = values;

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
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      type: "user",
    };

    axios
      .post(serverUrl + "/users/update/" + localStorage.getItem(TOKEN_ID), user)
      .then((response) => {
        console.log(response);
        toast("User Update");
        setTimeout(() => {
          window.location = "/";
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response);
        toast("Email or Username Exists");
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={submitHandler} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChangeHandler("firstName")}
                  type="text"
                  value={firstName}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChangeHandler("lastName")}
                  value={lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
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
                  type="email"
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
              {msg && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {msg} <strong>check it out!</strong>
                  </Alert>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update Account
              </Button>
              <Grid container></Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
