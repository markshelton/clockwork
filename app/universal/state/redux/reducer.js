import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { reducer as auth } from "./ducks/auth";
import { reducer as calendar } from "./ducks/calendar";
const appReducer = combineReducers({ form, auth, calendar });
export default (state, action) => {
  console.log(action.type);
  return appReducer(state, action);
};
