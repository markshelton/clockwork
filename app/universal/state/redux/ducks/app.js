import { call, takeLatest, put } from "redux-saga/effects";
import AlertContainer from "react-alert";

import { types as authTypes } from "./auth";

// Types

export const types = {
  LOCATION_CHANGE: "app/LOCATION_CHANGE"
};

// Actions

export const actions = {
  change_location: newLocation => ({ type: types.LOCATION_CHANGE, newLocation })
};

// Sagas

export function* showErrorAlert({ error }) {}

// Saga Watcher

export function* uiSaga() {
  yield [
    takeLatest(authTypes.LOGIN_USER_FAILURE, showErrorAlert),
    takeLatest(authTypes.CREATE_USER_FAILURE, showErrorAlert)
  ];
}

// API

// Helpers
