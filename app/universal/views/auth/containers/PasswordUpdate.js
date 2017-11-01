import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/redux/ducks/auth";

class PasswordUpdate extends Component {
  componentDidMount = () => {
    const { token } = this.props.match.params;
    this.props.check_user_password_token({ token });
  };
  handleFormSubmit = ({ password }) => {
    this.props.update_user_password({ password });
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
            Update Password
          </button>
        </form>
      </div>
    );
  };
}

const validate = formProps => {
  const errors = {};
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
  reduxForm({ form: "password-update", validate })(PasswordUpdate)
);

const loadData = (store, req) => {
  const { token } = req.params;
  const action = actions.check_user_password_token(token);
  return store.dispatch(action);
};

export default { component, loadData };
