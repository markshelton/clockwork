import { call, takeLatest } from "redux-saga/effects";
import AlertContainer from "react-alert";

import { types as authTypes } from "./auth";

export function* showErrorAlert({ error }) {
  const alert = new AlertContainer();
  yield call(alert.msg.error, "Error", error);
}

export function* uiSaga() {
  yield [
    takeLatest(authTypes.LOGIN_FAILURE, showErrorAlert),
    takeLatest(authTypes.SIGNUP_FAILURE, showErrorAlert)
  ];
}
