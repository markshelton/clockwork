import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';

import Welcome from "./auth/welcome";
import CalendarMain from "./calendar/main";

class Home extends Component {  
  isAuth() {
    return (this.props.authenticated);
  }
  render() { 
    return(
      <DecisionRoute exact path="/"
        trueComponent = {CalendarMain}
        falseComponent = {Welcome}
        decisionFunc = {this.isAuth.bind(this)}
      />
    )
  };
}

const DecisionRoute = ({ trueComponent, falseComponent, decisionFunc, ...rest }) => {
  return (
    <Route {...rest}
      component={ decisionFunc() ? trueComponent : falseComponent }
    />
  )
}


function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
};

export default connect(mapStateToProps)(Home);