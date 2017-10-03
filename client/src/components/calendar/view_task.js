import React, {Component} from "react";
import { Link, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import history from "../history";
import * as actions from "../../actions";
import EditTask from "./edit_task";

class ViewTask extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchTask(id);
  }
  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deleteTask(id, () => history.push("/"));
  }
  render() {
    const {task} = this.props;
    this.onDeleteClick = this.onDeleteClick.bind(this);
    if(!task) {return <div>Loading...</div>;}
    return (
      <div>
        <Link to="/">Back To Calendar</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >Delete Post</button>
        <h3>{task.title}</h3>
      </div>
    );
  }
}

function mapStateToProps({tasks}, ownProps) {
  return {task: tasks[ownProps.match.params.id]};
}

export default connect(mapStateToProps, actions)(ViewTask);