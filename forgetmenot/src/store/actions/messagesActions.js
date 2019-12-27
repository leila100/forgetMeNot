import axios from "axios";

import * as actionTypes from "./actionTypes";

axios.interceptors.request.use(
  options => {
    options.headers.authorization = localStorage.getItem("jwt");
    return options;
  },
  error => {
    return Promise.reject(error);
  }
);

export const fetchMessages = () => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  return dispatch => {
    dispatch({ type: actionTypes.FETCHING });
    axios
      .get(endpoint)
      .then(response => {
        console.log("responce ", response.data);
        dispatch({ type: actionTypes.FETCHED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your messages!" });
      });
  };
};

export const addMessage = message => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  return dispatch => {
    dispatch({ type: actionTypes.ADDING });
    console.log("in action addMessage: ", message);
    axios
      .post(endpoint, message)
      .then(response => {
        dispatch({ type: actionTypes.ADDED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your messages!" });
      });
  };
};

export const saveCurrentMessage = message => {
  return dispatch => dispatch({ type: actionTypes.SAVECURRENT, payload: message });
};

export const updateMessage = (messageId, message) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders/${messageId}`;
  return dispatch => {
    dispatch({ type: actionTypes.UPDATING });
    axios
      .put(endpoint, message)
      .then(response => {
        dispatch({ type: actionTypes.UPDATED, messageId, message });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your messages!" });
      });
  };
};

export const deleteMessage = messageId => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders/${messageId}`;
  return dispatch => {
    dispatch({ type: actionTypes.DELETING });
    axios
      .delete(endpoint)
      .then(response => {
        dispatch({ type: actionTypes.DELETED, messageId });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your messages!" });
      });
  };
};
