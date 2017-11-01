//prettier-ignore
import { put, call, fork, take, race, all, takeLatest } from "redux-saga/effects";

//import { internalAPI, history } from "../state/";

// Types

export const types = {
  RESET_USER_PASSWORD_REQUEST: "auth/RESET_USER_PASSWORD_REQUEST",
  RESET_USER_PASSWORD_SUCCESS: "auth/RESET_USER_PASSWORD_SUCCESS",
  SEND_USER_PASSWORD_TOKEN_REQUEST: "auth/SEND_USER_PASSWORD_TOKEN_REQUEST",
  SEND_USER_PASSWORD_TOKEN_SUCCESS: "auth/SEND_USER_PASSWORD_TOKEN_SUCCESS",
  SEND_USER_PASSWORD_TOKEN_FAILURE: "auth/SEND_USER_PASSWORD_TOKEN_FAILURE",
  CHECK_USER_PASSWORD_TOKEN_REQUEST: "auth/CHECK_USER_PASSWORD_TOKEN_REQUEST",
  CHECK_USER_PASSWORD_TOKEN_SUCCESS: "auth/CHECK_USER_PASSWORD_TOKEN_SUCCESS",
  CHECK_USER_PASSWORD_TOKEN_FAILURE: "auth/CHECK_USER_PASSWORD_TOKEN_FAILURE",
  CHECK_USER_PASSWORD_TOKEN_EXPIRY: "auth/CHECK_USER_PASSWORD_TOKEN_EXPIRY",
  UPDATE_USER_PASSWORD_REQUEST: "auth/UPDATE_USER_PASSWORD_REQUEST",
  UPDATE_USER_PASSWORD_SUCCESS: "auth/UPDATE_USER_PASSWORD_SUCCESS",
  UPDATE_USER_PASSWORD_FAILURE: "auth/UPDATE_USER_PASSWORD_FAILURE",
  CREATE_USER_REQUEST: "auth/CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS: "auth/CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE: "auth/CREATE_USER_FAILURE",
  LOGIN_USER_REQUEST: "auth/LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCESS: "auth/LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE: "auth/LOGIN_USER_FAILURE",
  DELETE_USER_REQUEST: "auth/DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "auth/DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "auth/DELETE_USER_FAILURE",
  LOGOUT_USER_REQUEST: "auth/LOGOUT_USER_REQUEST",
  LOGOUT_USER_COMPLETE: "auth/LOGOUT_USER_COMPLETE"
};

import { types as appTypes } from "./app";

// Initial State

export const initialState = {
  isLoading: false,
  confirmMessage: false,
  isAuth: false,
  error: null
};

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_USER_PASSWORD_REQUEST:
    case types.SEND_USER_PASSWORD_TOKEN_REQUEST:
    case types.CHECK_USER_PASSWORD_TOKEN_REQUEST:
    case types.UPDATE_USER_PASSWORD_REQUEST:
    case types.CREATE_USER_REQUEST:
    case types.LOGIN_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
    case types.LOGOUT_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.RESET_USER_PASSWORD_FAILURE:
    case types.SEND_USER_PASSWORD_TOKEN_FAILURE:
    case types.CHECK_USER_PASSWORD_TOKEN_FAILURE:
    case types.UPDATE_USER_PASSWORD_FAILURE:
    case types.CREATE_USER_FAILURE:
    case types.LOGIN_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case types.SEND_USER_PASSWORD_TOKEN_SUCCESS:
      return { ...state, confirmMessage: true };

    case types.CHECK_USER_PASSWORD_TOKEN_EXPIRY:
      return { ...state, confirmMessage: false };

    case types.LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, isAuth: true };

    case types.LOGOUT_USER_COMPLETE:
      return { ...state, isLoading: false, isAuth: false };

    case appTypes.LOCATION_CHANGE:
      return { ...state, isLoading: false, error: null };

    default:
      return state;
  }
};

// Actions

//prettier-ignore
export const actions = {
  reset_user_password: ({email}) => ({ type: types.RESET_USER_PASSWORD_REQUEST, email }),
  send_user_password_token: ({email}) => ({ type: types.SEND_USER_PASSWORD_TOKEN_REQUEST, email }),
  check_user_password_token: () => ({ type: types.CHECK_USER_PASSWORD_TOKEN_REQUEST }),
  update_user_password: ({password}) => ({ type: types.UPDATE_USER_PASSWORD_REQUEST, password }),
  create_user: ({email, password}) => ({ type: types.CREATE_USER_REQUEST, email, password }),
  login_user: ({email, password}) => ({ type: types.LOGIN_USER_REQUEST, email, password }),
  delete_user: () => ({ type: types.DELETE_USER_REQUEST }),
  logout_user: () => ({ type: types.LOGOUT_USER_REQUEST }),
};

// Services

//prettier-ignore
export const api = {
  send_user_password_token: ({ email }) => internalAPI.post(`/users/password`, { email }),
  check_user_password_token: ({ passwordToken, email }) => internalAPI.get(`/users/password`, { passwordToken, email }),
  update_user_password: ({ password }) => internalAPI.put(`/users/password`, { password }),
  create_user: ({ email, password} ) => internalAPI.post(`/users`, { email, password }),  
  login_user: ({ email, password }) => internalAPI.post(`/users/login`, { email, password }),
  delete_user: () => internalAPI.delete(`/users`),
};

// Sagas

// -- Reset Password Sagas

function* sendUserPasswordTokenFlow({ email }) {
  try {
    yield call(api.send_user_password_token, { email }); //ERROR
    yield put({ type: types.SEND_USER_PASSWORD_TOKEN_SUCCESS });
  } catch (e) {
    console.log(e);
    yield put({
      type: types.SEND_USER_PASSWORD_TOKEN_FAILURE,
      error: e.response.data.error
    });
  }
}

function* checkUserPasswordTokenFlow({ email }) {
  try {
    const { passwordToken } = yield take(
      types.CHECK_USER_PASSWORD_TOKEN_REQUEST
    );
    const { data: { token } } = yield call(api.check_user_password_token, {
      passwordToken,
      email
    });
    yield call(setAuthToken, token);
    yield put({ type: types.CHECK_USER_PASSWORD_TOKEN_SUCCESS });
  } catch (e) {
    if (e.response.data.error.type == "expiry") {
      yield put({ type: types.CHECK_USER_PASSWORD_TOKEN_EXPIRY });
      yield call(history.push, "/reset");
    } else {
      yield put({
        type: types.CHECK_USER_PASSWORD_TOKEN_FAILURE,
        error: e.response.data.error
      });
    }
  }
}

function* updateUserPasswordFlow() {
  try {
    const { password } = yield take(types.UPDATE_USER_PASSWORD_REQUEST);
    yield call(api.update_user_password, { password });
    yield put({ type: types.UPDATE_USER_PASSWORD_SUCCESS });
  } catch (e) {
    yield put({
      type: types.UPDATE_USER_PASSWORD_FAILURE,
      error: e.response.data.error
    });
  }
}

function* resetUserPasswordFlow({ email }) {
  while (true) {
    console.log("yo", { email });
    yield race({
      call: call(sendUserPasswordTokenFlow, { email }),
      success: take(types.SEND_USER_PASSWORD_TOKEN_SUCCESS)
    });
    const { expiry } = yield race({
      call: call(checkUserPasswordTokenFlow, { email }),
      success: take(types.CHECK_USER_PASSWORD_TOKEN_SUCCESS),
      expiry: take(types.CHECK_USER_PASSWORD_TOKEN_EXPIRY)
    });
    if (expiry) continue;
    yield race({
      call: call(updateUserPasswordFlow),
      success: take(types.UPDATE_USER_PASSWORD_SUCCESS)
    });
    yield put({ type: types.RESET_USER_PASSWORD_SUCCESS });
    yield call(loginFlow);
  }
}

// -- Authentication Sagas

function* authUserFlow() {
  while (true) {
    yield race({
      pre_login: call(preLoginUserFlow),
      login: take(types.LOGIN_USER_SUCCESS)
    });
    yield call(history.push, "/calendar");
    yield race({
      post_login: call(postLoginUserFlow),
      logout: take(types.LOGOUT_USER_COMPLETE)
    });
    yield call(history.push, "/goodbye");
  }
}

function* preLoginUserFlow() {
  yield takeLatest(types.RESET_USER_PASSWORD_REQUEST, resetUserPasswordFlow);
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserFlow);
  yield takeLatest(types.CREATE_USER_REQUEST, createUserFlow);
}

function* postLoginUserFlow() {
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUserFlow);
  yield takeLatest(types.LOGOUT_USER_REQUEST, logoutUserFlow);
}

function* createUserFlow({ email, password }) {
  try {
    const { data: { token } } = yield call(api.create_user, {
      email,
      password
    });
    yield call(setAuthToken, token);
    yield put({ type: types.CREATE_USER_SUCCESS });
    yield call(loginFlow, { email, password });
  } catch (e) {
    yield put({
      type: types.CREATE_USER_FAILURE,
      error: e.response.data.error
    });
  }
}

function* loginUserFlow({ email, password }) {
  try {
    let token = yield call(getAuthToken);
    if (!token) {
      const response = yield call(api.login_user, { email, password });
      yield call(setAuthToken, response.data.token);
    }
    yield put({ type: types.LOGIN_USER_SUCCESS });
  } catch (e) {
    yield put({
      type: types.LOGIN_USER_FAILURE,
      error: e.response.data.error
    });
  }
}

function* deleteUserFlow() {
  try {
    yield call(api.delete_user);
    yield put({ type: types.DELETE_USER_SUCCESS });
    yield call(logoutFlow);
  } catch (e) {
    yield put({
      type: types.DELETE_USER_FAILURE,
      error: e.response.data.error
    });
  }
}

function* logoutFlow() {
  yield call(removeAuthToken);
  yield put({ type: types.LOGOUT_USER_COMPLETE });
}

// Saga Watcher

export function* saga() {
  yield call(authUserFlow);
}

// Selectors

// Helpers

const getAuthToken = () => JSON.parse(localStorage.getItem("token"));
const setAuthToken = token =>
  localStorage.setItem("token", JSON.stringify(token));
const removeAuthToken = () => localStorage.removeItem("token");
