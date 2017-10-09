import { AUTH_USER, UNAUTH_USER } from "../constants/action_types";

export const reducer = (state = {}, { type }) => {
  switch (type) {
    case AUTH_USER:
      return { ...state, auth: true };
    case UNAUTH_USER:
      return { ...state, auth: false };
    default:
      return state;
  }
};
