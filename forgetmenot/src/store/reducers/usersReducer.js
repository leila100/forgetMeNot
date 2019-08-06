import { GETTING_USER, GOT_USER, ERROR } from "../actions/actionTypes";

const initialState = {
  currentUsername: null,
  currentUserId: null,
  adding: false,
  errorMessage: ""
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return {
        currentUsername: null,
        currentUserId: null,
        adding: true,
        errorMessage: ""
      };
    case GOT_USER:
      return {
        currentUsername: action.username,
        currentUserId: action.userId,
        adding: false,
        errorMessage: ""
      };
    case ERROR:
      return {
        currentUsername: null,
        currentUserId: null,
        adding: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
