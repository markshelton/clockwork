import reduxThunk from "redux-thunk";
import axios from "axios";
import {FETCH_TASK} from "./types";

const API_URL = "http://localhost:3090";

export function fetchTask() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: {authorization: localStorage.getItem("token")}})
      .then(response => {
        dispatch({
          type: FETCH_TASK,
          payload: response.data.message
        });
      });
  }
};