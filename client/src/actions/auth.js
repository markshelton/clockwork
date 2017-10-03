import reduxThunk from "redux-thunk";
import axios from "axios";
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from "./types";

const API_URL = "http://localhost:3090";

export function signinUser({email, password}, history) {
  return function (dispatch) {
    // Submit email / password to the server
    axios.post(`${API_URL}/signin`, {email, password})
      .then(response => { // if request is good ...
        dispatch({type: AUTH_USER}); // - Update state to indicate user is authenticated
        localStorage.setItem('token', response.data.token); // - Save the JWT token
        history.push('/'); // - Redirect to the route '/feature'
      })
      .catch(error => { // if request is bad ...
        dispatch(authError("Incorrect username or password"));// - Show an error to the user
      })
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem("token");
  return ({type: UNAUTH_USER});
}

export function signupUser({email, password}, history) {
  return function (dispatch) {
    axios.post(`${API_URL}/signup`, {email, password})
      .then(response => { // if request is good ...
        dispatch({type: AUTH_USER}); // - Update state to indicate user is authenticated
        localStorage.setItem('token', response.data.token); // - Save the JWT token
        history.push('/'); // - Redirect to the route '/feature'
      })
      .catch(error => { // if request is bad ...
        dispatch(authError(error.response.data.error));// - Show an error to the user
      })
  }
};
