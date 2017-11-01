import { createStore, applyMiddleware } from "redux";
import axios from "axios";

import reducer from "../../state/redux/reducer";
import createMiddleware from "../../state/redux/middleware";

export default () => {
  const initialState = window.INITIAL_STATE;
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL
  });
  const middleware = createMiddleware(axiosInstance);
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};
