// Vendor Libraries
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

// Local Libraries
import reducers from "./reducers/_reducers";
import history from "./constants/history";
import { AUTH_USER } from "./constants/action_types";
import Header from "./containers/app/header";
import Main from "./containers/app/main";
import Footer from "./containers/app/footer";

// Middleware / Store prep
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
if (token) store.dispatch({ type: AUTH_USER, payload: token });

//Render
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.querySelector(".container")
);
