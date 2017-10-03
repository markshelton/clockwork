import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from "./home";
import Signin from "./auth/signin";
import Signout from "./auth/signout";
import Signup from "./auth/signup";
import Settings from "./auth/settings";

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/signin' component={Signin}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/signout' component={Signout}/>
    <Route path='/settings' component={Settings}/>
  </Switch>
);

export default Main;