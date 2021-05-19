import React, { Component } from "react";
import { HashRouter, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import { checkUser, userLogOut } from "./redux/actions/users";
import "./scss/style.scss";
import AuthRoute from "./utils/AuthRoute";
import DashboardRoute from "./utils/DashboardRoute";
import { useDispatch } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
    jwt.verify(localStorage.getItem("token"), "umgo123", (err, decode) => {
      if (err) {
        dispatch(userLogOut());
      } else {
        dispatch(checkUser(localStorage.getItem("token")));
      }
    });
  }
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <AuthRoute path="/login" />
          <DashboardRoute path="/" />
          {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> */}

          {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
