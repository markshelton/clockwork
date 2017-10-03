import React, {Component} from "react";
import PropTypes from 'prop-types';
import {reduxForm, Field, SubmissionError} from "redux-form";
import {connect} from "react-redux";
import * as actions from "../../actions";

class Signup extends Component {
  static contextTypes = {router: PropTypes.object}
  handleFormSubmit({email, password, passwordConfirm}) {
    this.props.signupUser({email, password, passwordConfirm}, this.context.router.history);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className ="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  renderField({input, label, type, meta: {touched, error, warning}}) {
    return (
      <div>
        <input {...input} type={type} className="form-control" />
        {touched && error && <div className='error'>{error}</div>}
      </div>
    );
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <label>Email:</label>
          <Field name="email" type="text" component={this.renderField} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component={this.renderField} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <Field name="passwordConfirm" type="password" component={this.renderField} />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (!(formProps.email)) { 
    errors.email = "Please enter an email.";
  }
  if (!(formProps.password)) {
    errors.password = "Please enter a password.";
  }
  if (!(formProps.passwordConfirm)) {
    errors.passwordConfirm = "Please confirm your password.";
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
}

const reduxFormSignup = reduxForm({form: 'signup', validate})(Signup);
 
function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default connect(mapStateToProps, actions)(reduxFormSignup);