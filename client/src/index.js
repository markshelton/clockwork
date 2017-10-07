// Vendor Libraries
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

// Components, Reducers & Actions
import history from "./history";
import reducers from "./reducers";
import { AUTH_USER } from "./actions/types";

import App from "./components/app";

// Middleware / Store prep
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
if (token) store.dispatch({ type: AUTH_USER, payload: token });

//Render
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector(".container")
);
