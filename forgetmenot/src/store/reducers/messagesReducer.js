import { FETCHING, FETCHED, ADDING, ADDED, UPDATING, UPDATED } from "../actions/actionTypes";

const initialState = {
  messages: [],
  fetching: false,
  adding: false,
  updating: false
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        messages: [...state.messages],
        fetching: true,
        adding: false,
        updating: false
      };
    case FETCHED:
      return {
        messages: action.payload,
        fetching: false,
        adding: false,
        updating: false
      };
    case ADDING:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: true,
        updating: false
      };
    case ADDED:
      return {
        messages: [...state.messages, action.payload],
        fetching: false,
        adding: false,
        updating: false
      };

    case UPDATING:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: false,
        updating: true
      };
    case UPDATED:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: false,
        updating: false
      };

    default:
      return state;
  }
};
