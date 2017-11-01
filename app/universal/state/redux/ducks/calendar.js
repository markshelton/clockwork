import { put, call, takeLatest, all } from "redux-saga/effects";
import _ from "lodash";

//import { internalAPI, history } from "../state/";

// Types

export const types = {
  FETCH_TASKS_REQUEST: "calendar/FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS: "calendar/FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE: "calendar/FETCH_TASKS_FAILURE",
  FETCH_TASK_REQUEST: "calendar/FETCH_TASK_REQUEST",
  FETCH_TASK_SUCCESS: "calendar/FETCH_TASK_SUCCESS",
  FETCH_TASK_FAILURE: "calendar/FETCH_TASK_FAILURE",
  DELETE_TASK_REQUEST: "calendar/DELETE_TASK_REQUEST",
  DELETE_TASK_SUCCESS: "calendar/DELETE_TASK_SUCCESS",
  DELETE_TASK_FAILURE: "calendar/DELETE_TASK_FAILURE",
  CREATE_TASK_REQUEST: "calendar/CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS: "calendar/CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE: "calendar/CREATE_TASK_FAILURE",
  UPDATE_TASK_REQUEST: "calendar/UPDATE_TASK_REQUEST",
  UPDATE_TASK_SUCCESS: "calendar/UPDATE_TASK_SUCCESS",
  UPDATE_TASK_FAILURE: "calendar/UPDATE_TASK_FAILURE"
};

import { types as appTypes } from "./app";

// Initial State

export const initialState = {
  isLoading: false,
  tasks: null,
  task: null,
  error: null
};

// Reducer

export const reducer = (state = initialState, action) => {
  //prettier-ignore
  switch (action.type) {
    case types.FETCH_TASKS_REQUEST:
    case types.FETCH_TASK_REQUEST:
    case types.DELETE_TASK_REQUEST:
    case types.CREATE_TASK_REQUEST:
    case types.UPDATE_TASK_REQUEST:
      return { ...state, isLoading: true, error: null };
    
    case types.FETCH_TASKS_SUCCESS:
      return { ...state, isLoading: false, tasks: _.mapKeys(action.tasks, "_id") };
    case types.FETCH_TASK_SUCCESS:
      return { ...state, isLoading: false, task: { [action.id]: state.tasks } };
    case types.DELETE_TASK_SUCCESS:
      return { ...state, isLoading: false, tasks: _.omit(state.tasks, action.id) };
    case types.CREATE_TASK_SUCCESS:
    case types.UPDATE_TASK_SUCCESS: 
      return {...state, isLoading: false};

    case types.FETCH_TASKS_FAILURE:
    case types.FETCH_TASK_FAILURE:
    case types.DELETE_TASK_FAILURE:
    case types.CREATE_TASK_FAILURE:
    case types.UPDATE_TASK_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    
    case appTypes.LOCATION_CHANGE:
      return { ...state, isLoading: false, error: null };

    default:
      return state;
  }
};

// Actions

export const actions = {
  //prettier-ignore
  fetch_tasks: () => ({ type: types.FETCH_TASKS_REQUEST }),
  fetch_task: id => ({ type: types.FETCH_TASK_REQUEST, id }),
  delete_task: id => ({ type: types.DELETE_TASK_REQUEST, id }),
  create_task: task => ({ type: types.CREATE_TASK_REQUEST, task }),
  update_task: task => ({ type: types.UPDATE_TASK_REQUEST, task })
};

// Sagas

export function* fetch_tasks() {
  try {
    const { data: { tasks } } = yield call(api.fetch_tasks);
    yield put({ type: types.FETCH_TASKS_SUCCESS, tasks });
  } catch (e) {
    yield put({ type: types.FETCH_TASKS_FAILURE, error: e.message });
  }
}

export function* fetch_task({ id }) {
  try {
    yield call(api.fetch_task, id);
    yield put({ type: types.FETCH_TASK_SUCCESS, id });
  } catch (e) {
    yield put({ type: types.FETCH_TASK_FAILURE, error: e.message });
  }
}

export function* delete_task({ id }) {
  try {
    yield call(api.delete_task, id);
    yield put({ type: types.DELETE_TASK_SUCCESS, id });
    yield call(history.push, "/");
  } catch (e) {
    yield put({ type: types.DELETE_TASK_FAILURE, error: e.message });
  }
}

export function* create_task({ task }) {
  try {
    yield call(api.create_task, task);
    yield put({ type: types.CREATE_TASK_SUCCESS });
    yield call(history.push, "/");
  } catch (e) {
    yield put({ type: types.CREATE_TASK_FAILURE, error: e.message });
  }
}

export function* update_task({ task }) {
  try {
    yield call(api.update_task, task);
    yield put({ type: types.UPDATE_TASK_SUCCESS });
    yield call(history.push, "/");
  } catch (e) {
    yield put({ type: types.UPDATE_TASK_FAILURE, error: e.message });
  }
}

// Saga Watcher

export function* saga() {
  yield all([
    takeLatest(types.FETCH_TASKS_REQUEST, fetch_tasks),
    takeLatest(types.FETCH_TASK_REQUEST, fetch_task),
    takeLatest(types.DELETE_TASK_REQUEST, delete_task),
    takeLatest(types.CREATE_TASK_REQUEST, create_task),
    takeLatest(types.UPDATE_TASK_REQUEST, update_task)
  ]);
}

// Services

export const api = {
  fetch_tasks: () => internalAPI.get(`/tasks`),
  fetch_task: id => internalAPI.get(`/tasks/${id}`),
  delete_task: id => internalAPI.delete(`/tasks/${id}`),
  create_task: task => internalAPI.post(`/tasks`, task),
  update_task: task => internalAPI.post(`/tasks/${task.id}`, task)
};

// Helpers
