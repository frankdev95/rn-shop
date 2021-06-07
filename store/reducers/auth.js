import { AUTH_USER, AUTH_SESSION } from "../actions/auth";

const initialState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isLoggedIn: true,
        token: action.payload.idToken,
        userId: action.payload.localId,
      };
    default:
      return state;
  }
};
