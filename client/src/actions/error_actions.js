import {
  CLEAR_ERRORS,
  NETWORK_ERROR,
  USER_ERROR,
  CALENDAR_ERROR
} from "../constants/action_types";

export const clearError = () => {
  return { type: CLEAR_ERRORS };
};

export const networkError = error => {
  return { type: NETWORK_ERROR, payload: error };
};

export const userError = error => {
  return { type: USER_ERROR, payload: error };
};

export const calendarError = error => {
  return { type: CALENDAR_ERROR, payload: error };
};
