import React, {Component} from "react";
import {connect} from "react-redux";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {PublicRoute, PrivateRoute} from "../main";
import ViewCalendar from "./view_calendar";
import NewTask from "./new_task";
import ViewTask from "./view_task";

class CalendarMain extends Component {
  render() {
    const auth = this.props.authenticated;    
    return (
      <Switch>
        <Route path="/tasks/:id/view" component={ViewTask}/>
        <Route path="/tasks/new" component={NewTask}/>
        <PrivateRoute path='/calendar' component={ViewCalendar} auth={auth}/>
      </Switch>
    );
  }
} 

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default withRouter(connect(mapStateToProps)(CalendarMain));
