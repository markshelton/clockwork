import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Welcome from "../../components/welcome";
import Goodbye from "../../components/goodbye";
import Signin from "../auth/signin";
import Signup from "../auth/signup";
import Calendar from "../calendar/calendar";
import ViewTask from "../calendar/view_task";
import EditTask from "../calendar/edit_task";
import NewTask from "../calendar/new_task";
import Settings from "../calendar/settings";

class Main extends Component {
  render = () => {
    const { auth } = this.props;
    // prettier-ignore
    return (
      <div>
        <PublicRoute exact path="/" component={Welcome} auth={auth} />
        <Route exact path="/goodbye" component={Goodbye} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/calendar" component={Calendar} auth={auth} />
        <PrivateRoute exact path="/settings" component={Settings} auth={auth} />
        <PrivateRoute exact path="/tasks/:id/view" component={ViewTask} auth={auth} />
        <PrivateRoute exact path="/tasks/:id/edit" component={EditTask} auth={auth} />
        <PrivateRoute exact path="/tasks/new" component={NewTask} auth={auth} />
      </div>
    );
  };
}

export const PublicRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !auth ? <Component {...props} /> : <Redirect to="/calendar" />}
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

const mapStateToProps = state => ({ auth: state.user.auth });

export default withRouter(connect(mapStateToProps)(Main));
