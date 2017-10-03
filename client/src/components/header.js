import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Link, Switch, withRouter} from "react-router-dom";

import Signin from "./auth/signin";
import Signout from "./auth/signout";
import Signup from "./auth/signup";
import Settings from "./auth/settings";

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
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">Smart Planner</Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/signout' component={Signout}/>
        <Route path='/settings' component={Settings}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default withRouter(connect(mapStateToProps)(Header));