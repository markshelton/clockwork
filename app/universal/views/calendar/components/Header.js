import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { actions } from "../../../state/redux/ducks/auth";

class Header extends Component {
  handleSignout = () => {
    this.props.logout();
  };
  renderLinks = () => {
    if (this.props.auth) {
      return [
        <li className="nav-item" key="Settings">
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
        </li>,
        <li className="nav-item" key="Sign Out" onClick={this.handleSignout}>
          <Link className="nav-link" to="/goodbye">
            Sign Out
          </Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key="Sign Up">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>,
        <li className="nav-item" key="Sign In">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
      ];
    }
  };
  render = () => {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Link to="/" className="navbar-brand">
          Smart Planner
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">{this.renderLinks()}</ul>
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({ auth: state.auth.auth });

export default connect(mapStateToProps, actions)(Header);
