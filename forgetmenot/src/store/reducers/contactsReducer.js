import {
  GETTING_CONTACTS,
  GOT_CONTACTS,
  ADDING_CONTACT,
  ADDED_CONTACT,
  DELETING_CONTACT,
  DELETED_CONTACT
} from "../actions/actionTypes";

const initialState = {
  contacts: [],
  getting: false,
  adding: false,
  deleting: false
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_CONTACTS:
      return {
        contacts: [...state.contacts],
        getting: true,
        adding: false,
        deleting: false
      };
    case GOT_CONTACTS:
      return {
        contacts: action.payload,
        getting: false,
        adding: false,
        deleting: false
      };
    case ADDING_CONTACT:
      return {
        contacts: [...state.contacts],
        getting: false,
        adding: true,
        deleting: false
      };
    case ADDED_CONTACT:
      return {
        contacts: [...state.contacts, action.payload],
        getting: false,
        adding: false,
        deleting: false
      };
    default:
      return state;
  }
};
