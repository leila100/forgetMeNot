import { FETCHING, FETCHED, ADDING, ADDED, UPDATING, UPDATED, DELETING, DELETED } from "../actions/actionTypes";

const initialState = {
  messages: [],
  fetching: false,
  adding: false,
  updating: false,
  deleting: false
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        messages: [...state.messages],
        fetching: true,
        adding: false,
        updating: false,
        deleting: false
      };
    case FETCHED:
      return {
        messages: action.payload,
        fetching: false,
        adding: false,
        updating: false,
        deleting: false
      };
    case ADDING:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: true,
        updating: false,
        deleting: false
      };
    case ADDED:
      return {
        messages: [...state.messages, action.payload],
        fetching: false,
        adding: false,
        updating: false,
        deleting: false
      };

    case UPDATING:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: false,
        updating: true,
        deleting: false
      };
    case UPDATED:
      const updatedMessages = [...state.messages];
      const index = updatedMessages.findIndex(message => message.id === action.messageId);
      updatedMessages[index] = { ...updatedMessages[index], ...action.message };
      return {
        messages: updatedMessages,
        fetching: false,
        adding: false,
        updating: false,
        deleting: false
      };
    case DELETING:
      return {
        messages: [...state.messages],
        fetching: false,
        adding: false,
        updating: false,
        deleting: true
      };
    case DELETED:
      const messages = state.messages.filter(message => message.id !== action.messageId);
      return {
        messages: messages,
        fetching: false,
        adding: false,
        updating: false,
        deleting: true
      };

    default:
      return state;
  }
};
