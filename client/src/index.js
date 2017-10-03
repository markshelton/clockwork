// Vendor Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Components
import App from './components/app';
// Reducers
import reducers from './reducers';
// Actions
import {AUTH_USER} from "./actions/types";


// Middleware / Store prep
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
if (token) {store.dispatch({type: AUTH_USER})}

//Render
ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.querySelector('.container'));