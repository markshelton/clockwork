import { combineReducers } from "redux";

import { reducer as form } from "redux-form";
import { reducer as error } from "./error_reducer";
import { reducer as user } from "./user_reducer";
import { reducer as calendar } from "./calendar_reducer";
import { UNAUTH_USER } from "../constants/action_types";

const appReducer = combineReducers({ form, user, calendar, error });

const rootReducer = (state, action) => {
  console.log(action);
  if (action.type === UNAUTH_USER) {
    state.calendar = undefined;
    state.user = undefined;
    state.form = undefined;
    state.error = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
