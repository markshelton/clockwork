import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../actions/_actions";

class Settings extends Component {
  render() {
    return <div>Settings page. Work in progress...</div>;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps, actions)(Settings);
