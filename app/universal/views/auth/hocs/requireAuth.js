import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

const requireAuth = (ChildComponent, redirect) => {
  class RequireAuth extends Component {
    render = () => {
      switch (this.props.auth.isAuth) {
        case true:
          return <ChildComponent {...this.props} />;
        case false:
          return <Redirect to={redirect} />;
        default:
          return <div>Loading...</div>;
      }
    };
  }
  const mapStateToProps = ({ auth }) => ({ auth });
  const component = withRouter(connect(mapStateToProps)(RequireAuth));
  return { component };
};

export default requireAuth;
