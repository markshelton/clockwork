import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

import Welcome from "../../components/Welcome";
import Goodbye from "../../components/Goodbye";
import NotFound from "../../components/NotFound";
import Signin from "../auth/Signin";
import Signup from "../auth/Signup";
import ResetPassword from "../auth/ResetPassword";
import Calendar from "../calendar/Calendar";
import ViewTask from "../calendar/ViewTask";
import EditTask from "../calendar/EditTask";
import NewTask from "../calendar/NewTask";
import Settings from "../calendar/Settings";

import styles from "./Main.scss";

class Main extends Component {
  render = () => {
    const { auth } = this.props;
    return (
      // prettier-ignore
      <Switch>
        <PublicRoute exact path="/" component={Welcome} auth={auth} />
        <Route exact path="/goodbye" component={Goodbye} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/calendar" component={Calendar} auth={auth} />
        <PrivateRoute exact path="/settings" component={Settings} auth={auth} />
        <PrivateRoute exact path="/tasks/:id/view" component={ViewTask} auth={auth} />
        <PrivateRoute exact path="/tasks/:id/edit" component={EditTask} auth={auth} />
        <PrivateRoute exact path="/tasks/new" component={NewTask} auth={auth} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  };
}

const mapStateToProps = state => ({ auth: state.auth.auth });

export default withRouter(connect(mapStateToProps)(Main));

// Route Helpers

// prettier-ignore
export const PublicRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route { ...rest }
      render={ props => !auth 
        ? <Component { ...props } /> 
        : <Redirect to= "/calendar" />
      }
    />
  );
};

// prettier-ignore
export const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route { ...rest } 
      render={ props => auth
        ? <Component { ...props } />
        : <Redirect to= "/signin" />
      }
    />
  );
};
