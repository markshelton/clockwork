import { put, call, fork, take, race, all } from "redux-saga/effects";

import { internalAPI, history } from "../state/";

// Types

export const types = {
  SIGNUP_REQUEST: "auth/SIGNUP_REQUEST",
  SIGNUP_SUCCESS: "auth/SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "auth/SIGNUP_FAILURE",
  LOGIN_REQUEST: "auth/LOGIN_REQUEST",
  LOGIN_SUCCESS: "auth/LOGIN_SUCCESS",
  LOGIN_FAILURE: "auth/LOGIN_FAILURE",
  LOGOUT: "auth/LOGOUT"
};

// Initial State

export const initialState = {
  isLoading: false,
  auth: false,
  error: null
};

// Reducer

export const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.SIGNUP_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, auth: true };

    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case types.LOGOUT:
      return { ...state, auth: false };

    default:
      return state;
  }
};

// Actions

// prettier-ignore
export const actions = {
  signup: ({email, password}) => ({ type: types.SIGNUP_REQUEST, email, password }),
  login: ({email, password}) => ({type: types.LOGIN_REQUEST, email, password }),
  logout: () => ({ type: types.LOGOUT })
};

// Sagas

export function* loginFlow() {
  while (true) {
    try {
      let token = yield call(getAuthToken);
      if (!token) {
        const { email, password } = yield take(types.LOGIN_REQUEST);
        const response = yield call(api.signin, { email, password });
        token = response.data.token;
        yield call(setAuthToken, token);
      }
      yield put({ type: types.LOGIN_SUCCESS });
      yield call(history.push, "/");
      yield take(types.LOGOUT);
      yield call(removeAuthToken);
    } catch (e) {
      yield put({ type: types.LOGIN_FAILURE, error: e.message });
    }
  }
}

export function* signupFlow() {
  while (true) {
    try {
      const { email, password } = yield take(types.SIGNUP_REQUEST);
      const response = yield call(api.signup, { email, password });
      const token = response.data.token;
      yield call(setAuthToken, token);
      yield put({ type: types.SIGNUP_SUCCESS });
      yield call(loginFlow);
    } catch (e) {
      yield put({ type: types.SIGNUP_FAILURE, error: e.message });
    }
  }
}

// Saga Watcher

export function* saga() {
  yield [fork(signupFlow), fork(loginFlow)];
}

// Services

//prettier-ignore
export const api = {
  signin: credentials => internalAPI.post(`/signin`, credentials),
  signup: credentials => internalAPI.post(`/signup`, credentials)
};

// Helpers

const getAuthToken = () => JSON.parse(localStorage.getItem("token"));
const setAuthToken = token =>
  localStorage.setItem("token", JSON.stringify(token));
const removeAuthToken = () => localStorage.removeItem("token");
