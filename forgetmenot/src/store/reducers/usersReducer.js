import { GETTING_USER, GOT_USER, ERROR, UPDATED_USER, UPDATING_USER } from "../actions/actionTypes";

const initialState = {
  currentUser: null,
  currentUserId: null,
  adding: false,
  errorMessage: "",
  updating: false
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return {
        currentUser: null,
        currentUserId: null,
        adding: true,
        errorMessage: "",
        updating: false
      };
    case GOT_USER:
      return {
        currentUser: action.user,
        currentUserId: action.userId,
        adding: false,
        errorMessage: "",
        updating: false
      };
    case UPDATING_USER:
      return {
        currentUser: state.currentUser,
        currentUserId: state.currentUserId,
        adding: false,
        errorMessage: "",
        updating: true
      };
    case UPDATED_USER:
      return {
        currentUser: action.user,
        currentUserId: action.userId,
        adding: false,
        errorMessage: "",
        updating: false
      };
    case ERROR:
      return {
        currentUser: null,
        currentUserId: null,
        adding: false,
        errorMessage: action.payload,
        updating: false
      };
    default:
      return state;
  }
};
