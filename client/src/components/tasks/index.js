import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import ViewCalendar from "./view_calendar";
import NewTask from "./new_task";
import TaskMain from "../task/";

class TasksMain extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path="/tasks/view" component={ViewCalendar} />
        <Route exact path="/tasks/new" component={NewTask} />
        <Route path="/tasks/:id" component={TaskMain} />
        <Redirect exact from="/tasks" to="/tasks/view" />
      </Switch>
    );
  }
}

export default withRouter(TasksMain);
