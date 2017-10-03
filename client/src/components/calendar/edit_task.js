import React, {Component} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";

import * as actions from "../../actions";

class EditTask extends Component {
  render() {
    return <div>Edit task page. Work in progress...</div>;
  }
}

export default connect(null, actions)(EditTask);