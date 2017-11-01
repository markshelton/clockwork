import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { actions } from "../../../state/redux/ducks/auth";

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = { confirmMessage: false };
  }
  handleFormSubmit = ({ email }) => {
    this.props.reset_user_password({ email });
    this.setState({ confirmMessage: true, email });
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
    if (this.state.confirmMessage)
      return (
        <div>
          <div>We've sent an email to:</div>
          <div>{this.state.email}</div>
        </div>
      );
    return (
      <div className="form">
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <div className="form-group">
            <label>Email:</label>
            <Field name="email" type="text" component={this.renderField} />
          </div>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            Reset Password
          </button>
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
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

const component = connect(mapStateToProps, actions)(
  reduxForm({ form: "password-reset", validate })(PasswordReset)
);

export default { component };
