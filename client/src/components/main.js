import React, {Component} from "react";
import {connect} from "react-redux";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';

import Welcome from "./auth/welcome";
import CalendarMain from "./calendar/main";

class Main extends Component {
  render() {
    const auth = this.props.authenticated;    
    return (
      <Switch>
        <PublicRoute exact path='/' component={Welcome} auth={auth}/>
        <PrivateRoute path='/calendar' component={CalendarMain} auth={auth}/>
      </Switch>
    );
  }
} 

export const PublicRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      !auth 
        ? (<Component {...props}/>) 
        : (<Redirect to="/calendar"/>)
    )}/>
  );
};

export const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      auth 
        ? (<Component {...props}/>) 
        : (<Redirect to='/signin'/>)
    )}/>
  );
};

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default withRouter(connect(mapStateToProps)(Main));
