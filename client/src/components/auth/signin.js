import React, {Component} from "react";
import PropTypes from 'prop-types';
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  static contextTypes = {router: PropTypes.object}
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password}, this.context.router);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className ="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  renderField(field) {
    return (
      <div>
        <input 
          {...field.input} 
          type={field.type} 
          className="form-control" />
      </div>
    );
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <label>Email:</label>
          <Field 
            name="email" type="text" 
            component={this.renderField} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <Field 
            name="password" type="password" 
            component={this.renderField} />
        </div>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const reduxFormSignin = reduxForm({form: 'signin'})(Signin);
 
function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default connect(mapStateToProps, actions)(reduxFormSignin);