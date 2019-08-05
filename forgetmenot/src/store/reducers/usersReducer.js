import { GETTING_USER, GOT_USER, ERROR } from "../actions/actionTypes";

const initialState = {
  currentUsername: null,
  adding: false,
  errorMessage: ""
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return {
        currentUsername: null,
        adding: true,
        errorMessage: ""
      };
    case GOT_USER:
      return {
        currentUsername: action.payload,
        adding: false,
        errorMessage: ""
      };
    case ERROR:
      return {
        currentUsername: null,
        adding: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
