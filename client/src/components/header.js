import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Link} from "react-router-dom";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return ([
        <li className="nav-item" key="Settings">
          <Link className="nav-link" to="/settings">Settings</Link>
        </li>,
        <li className="nav-item" key="Sign Out">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ]);
    } else {
      return ([
        <li className="nav-item" key="Sign Up">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key="Sign In">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
      ]);
    }
  }
  render() {
    return(
      <div>
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">Smart Planner</Link>
          <ul className="nav navbar-nav">{this.renderLinks()}</ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default connect(mapStateToProps)(Header);