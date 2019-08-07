import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchMessages = () => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  return dispatch => {
    dispatch({ type: actionTypes.FETCHING });
    axios
      .get(endpoint)
      .then(response => {
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
    axios
      .post(endpoint, message)
      .then(response => {
        console.log(response.data);
        dispatch({ type: actionTypes.ADDED, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your messages!" });
      });
  };
};
