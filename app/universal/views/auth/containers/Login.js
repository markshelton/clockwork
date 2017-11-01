import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/redux/ducks/auth";

class Login extends Component {
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
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            Login
          </button>
          <div className="note">
            Forgot your password? <Link to="/reset">Reset password</Link>
          </div>
        </form>
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
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

const component = connect(mapStateToProps, actions)(
  reduxForm({ form: "login", validate })(Login)
);

export default { component };
