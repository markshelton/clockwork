import ReduxThunk from "redux-thunk";
import axios from "axios";

import {
  FETCH_TASKS,
  FETCH_TASK,
  DELETE_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  CREATE_TEMP_TASK,
  DELETE_TEMP_TASK
} from "../constants/action_types";
import history from "../constants/history";
import { calendarError, networkError } from "./error_actions";

const API_URL = "http://localhost:3090"; // move to config file

export const fetchTasks = () => dispatch => {
  axios
    .get(`${API_URL}/tasks`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: FETCH_TASKS, payload: response }),
      error => dispatch(calendarError("Can't fetch calendar"))
    )
    .catch(error => dispatch(networkError(error)));
};

export const fetchTask = id => dispatch => {
  axios
    .get(`${API_URL}/tasks/${id}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: FETCH_TASK, payload: response }),
      error => dispatch(calendarError("Can't fetch task"))
    )
    .catch(error => dispatch(networkError(error)));
};

export const deleteTask = id => dispatch => {
  axios
    .delete(`${API_URL}/tasks/${id}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => {
        dispatch({ type: DELETE_TASK, payload: id });
        history.push("/");
      },
      error => dispatch(calendarError("Can't delete task"))
    )
    .catch(error => dispatch(networkError(error)));
};

export const createTask = task => dispatch => {
  axios
    .post(`${API_URL}/tasks`, task, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => {
        dispatch({ type: CREATE_TASK });
        history.push("/");
      },
      error => dispatch(calendarError("Can't create task"))
    )
    .catch(error => dispatch(networkError(error)));
};

export const updateTask = task => dispatch => {
  const { id } = task;
  axios
    .post(`${API_URL}/tasks/${id}`, task, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => {
        dispatch({ type: UPDATE_TASK });
        history.push("/");
      },
      error => dispatch(calendarError("Can't update task"))
    )
    .catch(error => dispatch(networkError(error)));
};

export const createTempTask = task => dispatch => {
  dispatch({ type: CREATE_TEMP_TASK, payload: task });
  history.push("/tasks/new");
};

export const deleteTempTask = () => dispatch => {
  dispatch({ type: DELETE_TEMP_TASK });
  history.push("/");
};
