import {
  CLEAR_ERRORS,
  NETWORK_ERROR,
  USER_ERROR,
  CALENDAR_ERROR
} from "../constants/action_types";

export const reducer = (state = "", { payload, type }) => {
  switch (type) {
    case USER_ERROR:
      return payload;
    case CALENDAR_ERROR:
      return payload;
    case NETWORK_ERROR:
      return payload;
    case CLEAR_ERRORS:
      return "";
    default:
      return state;
  }
};
