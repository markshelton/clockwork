import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import ViewTask from "./view_task";
import EditTask from "./edit_task";

class TaskMain extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path="/tasks/:id/view" component={ViewTask} />
        <Route path="/tasks/:id/edit" component={EditTask} />
        <Redirect from="/tasks/:id" to="/tasks/:id/view" />
      </Switch>
    );
  }
}

export default withRouter(TaskMain);
