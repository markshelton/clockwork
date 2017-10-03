import React, {Component} from "react";
import {connect} from "react-redux";
import { Switch, Route, Redirect} from 'react-router-dom';

import {PublicRoute, PrivateRoute} from "../main";
import ViewCalendar from "./view_calendar";
import NewTask from "./new_task";
import ViewTask from "./view_task";
import EditTask from "./edit_task";

class CalendarMain extends Component {
  render() {
    const auth = this.props.authenticated;    
    return (
      <Switch>
        <Route path="/tasks/new" component={NewTask}/>
        <Route path="/tasks/:id/view" component={ViewTask}/>
        <Route path="/tasks/:id/edit" component={EditTask}/>
        <PrivateRoute path='/calendar' component={ViewCalendar} auth={auth}/>
      </Switch>
    );
  }
} 

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default connect(mapStateToProps)(CalendarMain);
