import { createStore, applyMiddleware } from "redux";
import axios from "axios";

import reducer from "../../state/redux/reducer";
import createMiddleware from "../../state/redux/middleware";

export default req => {
  const initialState = {};
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: { cookie: req.get("cookie") || "" }
  });
  const middleware = createMiddleware(axiosInstance);
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );
  return store;
};
