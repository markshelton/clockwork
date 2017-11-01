import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

class Settings extends Component {
  render() {
    return <div>Settings page. Work in progress...</div>;
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

const component = connect(mapStateToProps)(Settings);
export default { component };
