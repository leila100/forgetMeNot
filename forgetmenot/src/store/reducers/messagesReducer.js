import { FETCHING, FETCHED, ADDING, ADDED } from "../actions/actionTypes";

const initialState = {
  messages: [],
  fetching: false,
  adding: false
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        messages: [],
        fetching: true,
        adding: false
      };
    case FETCHED:
      return {
        messages: action.payload,
        fetching: false,
        adding: false
      };
    case ADDING:
      return {
        messages: [],
        fetching: false,
        adding: true
      };
    case ADDED:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: false
      };

    default:
      return state;
  }
};
