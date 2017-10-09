import ReduxThunk from "redux-thunk";
import axios from "axios";

import { userError, networkError } from "./error_actions";
import { AUTH_USER, UNAUTH_USER } from "../constants/action_types";
import history from "../constants/history";

const API_URL = "http://localhost:3090";

export const signinUser = ({ email, password }) => dispatch => {
  axios
    .post(`${API_URL}/signin`, { email, password })
    .then(
      response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        history.push("/");
      },
      error => {
        dispatch(userError("Incorrect username or password"));
      }
    )
    .catch(error => dispatch(networkError(error)));
};

export const signupUser = ({ email, password }) => dispatch => {
  axios
    .post(`${API_URL}/signup`, { email, password })
    .then(
      response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        history.push("/");
      },
      error => {
        dispatch(userError(error.response.data.error));
      }
    )
    .catch(error => dispatch(networkError(error)));
};

export const signoutUser = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: UNAUTH_USER });
};
