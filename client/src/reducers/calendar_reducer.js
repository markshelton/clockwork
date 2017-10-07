import _ from "lodash";
import {
  FETCH_TASKS,
  FETCH_TASK,
  DELETE_TASK,
  CREATE_TASK,
  TASK_ERROR,
  CREATE_TEMP_TASK,
  DELETE_TEMP_TASK
} from "../actions/types";

export const reducer = (state = {}, { payload, type }) => {
  switch (type) {
    case FETCH_TASKS:
      return { ...state, tasks: _.mapKeys(payload.data, "id") };
    case FETCH_TASK:
      return { ...state, task: { [payload.data.id]: payload.data } };
    case DELETE_TASK:
      return { ...state, tasks: _.omit(state.tasks, payload) };
    case CREATE_TASK:
      return state; // OMIT
    case TASK_ERROR:
      return { ...state, error: payload };
    case CREATE_TEMP_TASK:
      return { ...state, temp: payload };
    case DELETE_TEMP_TASK:
      return { ...state, temp: null };
    default:
      return state;
  }
};
