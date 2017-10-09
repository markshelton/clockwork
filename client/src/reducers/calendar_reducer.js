import _ from "lodash";
import {
  FETCH_TASKS,
  FETCH_TASK,
  DELETE_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  CREATE_TEMP_TASK,
  DELETE_TEMP_TASK
} from "../constants/action_types";

export const reducer = (state = {}, { payload, type }) => {
  switch (type) {
    case FETCH_TASKS:
      return { ...state, tasks: _.mapKeys(payload.data.tasks, "_id") };
    case FETCH_TASK:
      return { ...state, task: { [payload.data.id]: payload.data } };
    case DELETE_TASK:
      console.log(payload);
      return { ...state, tasks: _.omit(state.tasks, payload.data) };
    case CREATE_TASK:
      return state; // OMIT
    case UPDATE_TASK:
      return state; // OMIT
    case CREATE_TEMP_TASK:
      return { ...state, temp: payload };
    case DELETE_TEMP_TASK:
      return { ...state, temp: null };
    default:
      return state;
  }
};
