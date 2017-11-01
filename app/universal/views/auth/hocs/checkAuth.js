import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

const checkAuth = ({ component: ChildComponent }, redirect) => {
  class CheckAuth extends Component {
    render = () => {
      switch (this.props.auth.isAuth) {
        case false:
          return <ChildComponent {...this.props} />;
        case true:
          return <Redirect to={redirect} />;
        default:
          return <div>Loading...</div>;
      }
    };
  }
  const mapStateToProps = ({ auth }) => ({ auth });
  const component = withRouter(connect(mapStateToProps)(CheckAuth));
  return { component };
};

export default checkAuth;
