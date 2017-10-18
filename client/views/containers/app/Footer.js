import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Footer.scss";

class Footer extends Component {
  render = () => {
    return (
      <div className="Footer">
        <div>Smart Planner</div>
      </div>
    );
  };
}

const mapStateToProps = state => ({ auth: state.auth.auth });

export default connect(mapStateToProps)(Footer);
