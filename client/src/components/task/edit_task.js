import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DateTime from "react-datetime";
import DateTimeCSS from "react-datetime/css/react-datetime.css";
import moment from "moment";

import * as actions from "../../actions";

class EditTask extends Component {
  componentDidMount() {
    const { fetchTask, match: { params: { id } } } = this.props;
    fetchTask(id);
  }
  onDeleteClick() {
    const { history, deleteTask, match: { params: { id } } } = this.props;
    deleteTask(id);
    history.push("/");
  }
  onFormSubmit({ title, start, end }) {
    const { history, updateTask } = this.props;
    updateTask({ title, start, end });
    history.push("/");
  }
  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }
  renderStandardField(task, { input, type, label }) {
    return (
      <input
        {...input}
        type={type}
        value={task[label]}
        thisclassName="form-control"
      />
    );
  }
  renderDateTimeField(task, { input, label }) {
    return (
      <DateTime {...input} value={task[label]} thisclassName="form-control" />
    );
  }
  renderField({ input, label, type, meta: { touched, error, warning } }) {
    const { task } = this.props;
    if (type == "datetime") {
      return (
        <div>
          {this.renderDateTimeField(task, { input, label })}
          {touched && error && <div className="error">{error}</div>}
        </div>
      );
    } else {
      return (
        <div>
          {this.renderStandardField(task, { input, type, label })}
          {touched && error && <div className="error">{error}</div>}
        </div>
      );
    }
  }
  render() {
    console.log("edit task");
    this.renderField.bind(this);
    this.onFormSubmit.bind(this);
    this.onDeleteClick.bind(this);
    const { handleSubmit, task } = this.props;
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
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
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
        </form>
      </div>
    );
  }
}

function validate(formProps) {
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
  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    task: state.calendar.tasks[ownProps.match.params.id],
    errorMessage: state.auth.error
  };
}

const reduxFormEditTask = reduxForm({ form: "edit_task", validate })(EditTask);

export default withRouter(connect(mapStateToProps, actions)(reduxFormEditTask));
