import React, { Component } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/redux/ducks/auth";

class Signup extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.create_user({ email, password });
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
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div>
        <input {...input} type={type} className="form-control" />
        {touched && error && <div className="error">{error}</div>}
      </div>
    );
  };
  render = () => {
    return (
      <div className="signup">
        <div className="form">
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <div className="form-group">
              <label>Email:</label>
              <Field name="email" type="text" component={this.renderField} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <Field
                name="password"
                type="password"
                component={this.renderField}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <Field
                name="passwordConfirm"
                type="password"
                component={this.renderField}
              />
            </div>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">
              Sign up
            </button>
            <div className="note">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

const validate = formProps => {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Please enter an email.";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password.";
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please confirm your password.";
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

const component = connect(mapStateToProps, actions)(
  reduxForm({ form: "signup", validate })(Signup)
);

export default { component };
