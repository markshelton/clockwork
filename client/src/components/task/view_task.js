import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../actions";

class ViewTask extends Component {
  componentDidMount() {
    const { fetchTask, match: { params: { id } } } = this.props;
    fetchTask(id);
  }
  onDeleteClick() {
    const { deleteTask, match: { params: { id } } } = this.props;
    deleteTask(id);
  }
  render() {
    console.log("view task");
    this.onDeleteClick.bind(this);
    const { task } = this.props;
    if (!task) return <div>Loading...</div>;
    return (
      <div>
        <Link to="/">Back To Calendar</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{task.title}</h3>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { task: state.calendar.tasks[ownProps.match.params.id] };
}

export default withRouter(connect(mapStateToProps, actions)(ViewTask));
