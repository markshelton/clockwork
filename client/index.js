// Vendor Libraries
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// Local Libraries
import { store, history } from "./state/";
import App from "./views/containers/app/App";
import styles from "./styles/index.scss";

// Render
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
