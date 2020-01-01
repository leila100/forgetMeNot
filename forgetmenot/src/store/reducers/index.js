import { combineReducers } from "redux";
import { messagesReducer } from "./messagesReducer";
import { usersReducer } from "./usersReducer";
import { contactsReducer } from "./contactsReducer";

export default combineReducers({
  messagesReducer,
  usersReducer,
  contactsReducer
});
