import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Welcome from "./auth/welcome";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Settings from "./auth/settings";
import Signout from "./auth/signout";
import TasksMain from "./tasks/";

class Main extends Component {
  render() {
    const auth = this.props.authenticated;
    return (
      <Switch>
        <PublicRoute exact path="/" component={Welcome} auth={auth} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/signout" component={Signout} auth={auth} />
        <PrivateRoute exact path="/settings" component={Settings} auth={auth} />
        <PrivateRoute path="/tasks" component={TasksMain} auth={auth} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export const PublicRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !auth ? <Component {...props} /> : <Redirect to="/tasks" />}
    />
  );
};

export const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to="/signin" />}
    />
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps)(Main));
