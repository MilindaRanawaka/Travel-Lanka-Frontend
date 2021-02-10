import React from "react";
import { isLogin, logout } from "../ReactMiddleware/reactAuth";
import { Link } from "react-router-dom";
import { TOKEN_FNAME, TOKEN_TYPE } from "../config";
import "./Navbar.css";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      isLogin: isLogin(),
      SearchTerms: "",
      linkTo: "",
      cat: "",
    };
  }

  handleLogout = () => {
    logout();
    this.setState({
      isLogin: false,
    });
  };

  handleNameClick = () => {
    if (localStorage.getItem(TOKEN_TYPE) === "customer") {
      window.location = "/customer";
    } else if (localStorage.getItem(TOKEN_TYPE) === "admin") {
      window.location = "/admin";
    } else if (localStorage.getItem(TOKEN_TYPE) === "storeManager") {
      window.location = "/storeManager/editDetails";
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top custom-style-navbar">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <a className="navbar-brand" href="/">
                Travel Lanka
              </a>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="navbar-nav ml-md-auto">
                  <li className="nav-item active">
                    {this.state.isLogin ? (
                      <div>
                        {this.state.isLogin &&
                        localStorage.getItem(TOKEN_TYPE) === "customer" ? (
                          <div>
                            <a
                              className="navbar-brand"
                              href="/covid-dashboard"
                              style={{ fontSize: 16 }}
                            >
                              How Covid-19 in Sri Lanka?
                            </a>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="/update-user/" className="loged-info">
                              Update My Info
                            </a>
                            <a href="/add-location" className="loged-info">
                              Add Location
                            </a>
                            <a href="/admin" className="loged-info">
                              {" "}
                              {localStorage.getItem(TOKEN_FNAME)}{" "}
                            </a>
                            <Link to="" onClick={() => this.handleLogout()}>
                              Logout
                            </Link>
                          </div>
                        ) : (
                          <span style={{ display: "none" }}> Empty </span>
                        )}
                        {this.state.isLogin &&
                        localStorage.getItem(TOKEN_TYPE) === "user" ? (
                          <div>
                            <a
                              className="navbar-brand"
                              href="/covid-dashboard"
                              style={{ fontSize: 16 }}
                            >
                              How Covid-19 in Sri Lanka?
                            </a>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="/update-user/" className="loged-info">
                              Update My Info
                            </a>
                            <a href="/add-trip" className="loged-info">
                              Plan a Trip
                            </a>
                            <a href="/user" className="loged-info">
                              {" "}
                              {localStorage.getItem(TOKEN_FNAME)}{" "}
                            </a>
                            <Link to="" onClick={() => this.handleLogout()}>
                              Logout
                            </Link>
                          </div>
                        ) : (
                          <span style={{ display: "none" }}> Empty </span>
                        )}
                        
                      </div>
                    ) : (
                      <div>
                        <a
                          className="navbar-brand"
                          href="/covid-dashboard"
                          style={{ fontSize: 16 }}
                        >
                          How Covid-19 in Sri Lanka?
                        </a>
                        <a href="/login">Sign Up / Login</a>
                      </div>
                    )}
                  </li>
                  <br />
                  <li className="nav-item dropdown"></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
