import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "../actions/types";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: false };
    case UNAUTH_USER:
      return { ...state, authenticated: false, erorr: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
