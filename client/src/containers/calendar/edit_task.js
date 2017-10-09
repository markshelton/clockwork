import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DateTime from "react-datetime";

import DateTimeCSS from "react-datetime/css/react-datetime.css";

import * as actions from "../../actions/_actions";

class EditTask extends Component {
  componentWillUnmount = () => {
    this.props.clearError();
  };
  componentDidMount = () => {
    this.props.fetchTask(this.props.match.params.id);
  };
  onDeleteClick = () => {
    this.props.deleteTask(this.props.match.params.id);
  };
  onFormSubmit = task => {
    this.props.updateTask(task);
  };
  renderAlert = () => {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  };
  renderField = ({ input, type, meta: { touched, error, warning } }) => {
    if (type == "datetime") {
      return <DateTime {...input} className="form-control" />;
    } else {
      return (
        <div>
          <input {...input} className="form-control" />
          {touched && error && <div className="error">{error}</div>}
        </div>
      );
    }
  };
  render = () => {
    if (!this.props.initialValues) return <div>Loading...</div>;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <div className="form-group">
            <label>Title:</label>
            <Field name="title" type="text" component={this.renderField} />
          </div>
          <div className="form-group">
            <label>Start:</label>
            <Field name="start" type="datetime" component={this.renderField} />
          </div>
          <div className="form-group">
            <label>End:</label>
            <Field name="end" type="datetime" component={this.renderField} />
          </div>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            Update Task
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
        </form>
      </div>
    );
  };
}

const validate = formProps => {
  const errors = {};
  if (!formProps.title) {
    errors.title = "Please enter a title.";
  }
  if (!formProps.start) {
    errors.start = "Please enter a start time.";
  }
  if (!formProps.end) {
    errors.end = "Please enter an end time.";
  }
  if (formProps.start && formProps.end && formProps.start > formProps.end) {
    errors.end = "Please enter an end time that is after the start time.";
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    initialValues: state.calendar.tasks[id],
    errorMessage: state.error
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(
    reduxForm({ form: "edit_task", validate })(EditTask)
  )
);
