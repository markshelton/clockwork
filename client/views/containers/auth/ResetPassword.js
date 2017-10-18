import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/auth";

class ResetPassword extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.login({ email, password });
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
  renderField = field => {
    return (
      <div>
        <input {...field.input} type={field.type} className="form-control" />
      </div>
    );
  };
  render = () => {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <div className="form-group">
          <label>Email:</label>
          <Field name="email" type="text" component={this.renderField} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component={this.renderField} />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
        <div>
          Forgot your password? Click here to{" "}
          <Link to="/reset-password">Reset Password</Link>
        </div>
      </form>
    );
  };
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default connect(mapStateToProps, actions)(
  reduxForm({ form: "reset-password" })(ResetPassword)
);
