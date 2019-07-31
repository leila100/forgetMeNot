import { combineReducers } from "redux";
import { messagesReducer } from "./messagesReducer";
import { usersReducer } from "./usersReducer";

export default combineReducers({
  messagesReducer,
  usersReducer
});
