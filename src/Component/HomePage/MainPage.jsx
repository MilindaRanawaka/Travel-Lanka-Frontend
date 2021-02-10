import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "../ReactMiddleware/PublicRoute";
import PrivateRoute from "../ReactMiddleware/PrivateRoute";
import Homepage from "./Homepage";
import Navbar from "../Navbar/Navbar";
import { Container } from "@material-ui/core";
import Login from "../User/Login";
import CreateUser from "../User/Signup";
import CovidDashboard from "../CovidDashboard/CovidDashboard";
import AdminHome from "../User/AdminHome";
import AddLocation from "../Location/AddLocation";
import UpdateLocation from "../Location/UpdateLocation";
import UpdateUser from "../User/UpdateUser";
import UserHome from "../User/UserHome";

//Contain all the user routes
function Dashboard() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Container
          maxWidth={false}
          style={{ marginTop: 55, paddingLeft: 0, paddingRight: 0 }}
        >
          <Switch>
            {/*All the Public Routes of System*/}
            <PublicRoute
              restricted={false}
              component={Homepage}
              path="/"
              exact
            />
            <PublicRoute
              restricted={true}
              component={Login}
              path="/login"
              exact
            />
            <PublicRoute
              restricted={true}
              component={CreateUser}
              path="/signup"
              exact
            />
            <PublicRoute
              restricted={false}
              component={CovidDashboard}
              path="/covid-dashboard"
              exact
            />

            {/*All the Public Routes of System
                        <PublicRoute restricted={false} component={Homepage} path="/" exact />
                        <PublicRoute restricted={true} component={Login} path="/login" exact />
                        <PublicRoute restricted={true} component={CreateUser} path="/create-acc" exact />

                        */}

            {/*Authorized Only Routes*/}
            <PrivateRoute component={AdminHome} path="/admin" AccessBy={"admin"} exact />
            <PrivateRoute component={UserHome} path="/user" AccessBy={"user"} exact />
            <PrivateRoute component={AddLocation} path="/add-location" AccessBy={"admin"} exact />
            <PrivateRoute component={UpdateLocation} path="/updatelocation/:id" AccessBy={"admin"} exact />
            <PrivateRoute component={UpdateUser} path="/update-user" AccessBy={"user"} exact />
            <PrivateRoute component={UpdateUser} path="/update-admin" AccessBy={"admin"} exact />

            {/*Authorized Only Routes
                        <PrivateRoute component={UserHome} path="/user" exact />
                        <PrivateRoute component={AddEvent} path="/add-event" exact />
                        <PrivateRoute component={UpdateEvent} path="/updateEvent/:id" exact />
                        <PrivateRoute component={UpdateUser} path="/update-user" exact />

                        */}
          </Switch>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default Dashboard;
