import ReduxThunk from "redux-thunk";
import axios from "axios";

import {
  FETCH_TASKS,
  FETCH_TASK,
  DELETE_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  TASK_ERROR,
  CREATE_TEMP_TASK,
  DELETE_TEMP_TASK
} from "./types";

import history from "../history";

const API_URL = "http://localhost:3090";

export const fetchTasks = () => dispatch => {
  axios
    .get(`${API_URL}/tasks`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: FETCH_TASKS, payload: response }),
      error => dispatch(taskError("Can't fetch calendar"))
    );
};

export const fetchTask = id => dispatch => {
  axios
    .get(`${API_URL}/tasks/${id}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: FETCH_TASK, payload: response }),
      error => dispatch(taskError("Can't fetch task"))
    );
};

export const deleteTask = id => dispatch => {
  axios
    .delete(`${API_URL}/tasks/${id}`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: DELETE_TASK, payload: id }),
      error => dispatch(taskError("Can't delete task"))
    );
};

export const createTask = task => dispatch => {
  axios
    .post(`${API_URL}/tasks`, task, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: CREATE_TASK }),
      error => dispatch(taskError("Can't create task"))
    );
};

export const updateTask = task => dispatch => {
  const { id } = task;
  axios
    .post(`${API_URL}/tasks/${id}`, task, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(
      response => dispatch({ type: UPDATE_TASK }),
      error => dispatch(taskError("Can't update task"))
    );
};

export const taskError = error => {
  return { type: TASK_ERROR, payload: error };
};

export const createTempTask = task => {
  return { type: CREATE_TEMP_TASK, payload: task };
};

export const deleteTempTask = () => {
  return { type: DELETE_TEMP_TASK };
};
