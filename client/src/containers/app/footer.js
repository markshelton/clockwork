import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../actions/_actions";

class Footer extends Component {
  render = () => {
    return <div>Footer</div>;
  };
}

const mapStateToProps = state => ({ auth: state.user.auth });

export default connect(mapStateToProps, actions)(Footer);
