import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { reducer as auth } from "./auth_reducer";
import { reducer as calendar } from "./calendar_reducer";

const rootReducer = combineReducers({ form, auth, calendar });

export default rootReducer;
