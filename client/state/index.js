// History
import createBrowserHistory from "history/createBrowserHistory";
export const history = createBrowserHistory();

// APIs
import axios from "axios";
const serverTimout = process.env.SERVER_TIMEOUT || 1000;
const serverURL = process.env.SERVER_BASE || "http://localhost";
const serverPort = process.env.SERVER_PORT || 3090;
const baseURL = `${serverURL}:${serverPort}`;
export const internalAPI = axios.create({ baseURL, serverTimout });
internalAPI.interceptors.request.use(config => {
  let { headers } = config;
  const token = JSON.parse(localStorage.getItem("token"));
  headers = { ...headers, authorization: token };
  config = { ...config, headers };
  return config;
});

// Redux Saga
import createSagaMiddleware from "redux-saga";
import { fork, all } from "redux-saga/effects";
import { saga as authSaga } from "./auth";
import { saga as calendarSaga } from "./calendar";
import { uiSaga } from "./app";
export const sagas = [authSaga, calendarSaga, uiSaga];
const sagaMiddleware = createSagaMiddleware();

// Authorization Middleware

//Combine Middleware
const middleware = [sagaMiddleware];

// Root Reducer
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { reducer as auth } from "./auth";
import { reducer as calendar } from "./calendar";
export const reducer = combineReducers({ form, auth, calendar });

// Create Store
import { createStore, applyMiddleware } from "redux";
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
export const store = createStoreWithMiddleware(reducer);

// Run Saga Middleware
sagas.forEach(saga => sagaMiddleware.run(saga));
