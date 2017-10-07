import ReduxThunk from "redux-thunk";
import axios from "axios";

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";
import history from "../history";

const API_URL = "http://localhost:3090";

export const signinUser = ({ email, password }) => dispatch => {
  axios.post(`${API_URL}/signin`, { email, password }).then(
    response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem("token", response.data.token);
      history.push("/");
    },
    error => {
      dispatch(authError("Incorrect username or password"));
    }
  );
};

export const signupUser = ({ email, password }) => dispatch => {
  axios.post(`${API_URL}/signup`, { email, password }).then(
    response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem("token", response.data.token);
      history.push("/");
    },
    error => {
      dispatch(authError(error.response.data.error));
    }
  );
};

export const authError = error => {
  return { type: AUTH_ERROR, payload: error };
};

export const signoutUser = () => {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
};
