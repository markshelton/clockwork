import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/calendar";

class ViewTask extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.fetch_task(id);
  };
  onDeleteClick = () => {
    const id = this.props.match.params.id;
    this.props.delete_task(id);
  };
  onEditClick = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/tasks/${id}/edit`);
  };
  render = () => {
    const task = this.props.location.state.task;
    if (!task) return <div>Loading...</div>;
    return (
      <div>
        <h2>Task View</h2>
        <h3>{`Title: ${task.title}`}</h3>
        <h4>{`Start: ${task.start}`}</h4>
        <h4>{`End: ${task.end}`}</h4>
        <h4>{`Longitude: ${task.loc.lng}`}</h4>
        <h4>{`Latitude: ${task.loc.lat}`}</h4>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onEditClick}
        >
          Edit Task
        </button>
        <button type="button" className="btn btn-secondary float-sm-right">
          <Link to="/">Back To Calendar</Link>
        </button>
        <button
          type="button"
          className="btn btn-danger float-sm-right"
          onClick={this.onDeleteClick}
        >
          Delete Task
        </button>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default withRouter(connect(mapStateToProps, actions)(ViewTask));
