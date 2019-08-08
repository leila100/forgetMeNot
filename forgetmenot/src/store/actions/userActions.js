import axios from "axios";

import * as actionTypes from "./actionTypes";

export function addUser(user) {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;
  return dispatch => {
    dispatch({ type: actionTypes.GETTING_USER });
    axios
      .post(endpoint, user)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        dispatch({ type: actionTypes.GOT_USER, username: response.data.username, userId: response.data.userId });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: error.response.data.errorMessage });
      });
  };
}

export function logUser(user) {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
  return dispatch => {
    dispatch({ type: actionTypes.GETTING_USER });
    axios
      .post(endpoint, user)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        dispatch({ type: actionTypes.GOT_USER, username: response.data.username, userId: response.data.userId });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: error.response.data.errorMessage });
      });
  };
}

export function getCurrentUser() {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/user`;
  return dispatch => {
    dispatch({ type: actionTypes.GETTING_USER });
    axios
      .get(endpoint)
      .then(response => {
        dispatch({
          type: actionTypes.GOT_USER,
          username: response.data.username,
          userId: response.data.userId
        });
      })
      .catch(error => {
        localStorage.removeItem("jwt");
        dispatch({ type: actionTypes.ERROR, payload: error.response ? error.response.data.errorMessage : error });
      });
  };
}
