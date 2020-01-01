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

export const getContacts = () => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/contacts`;
  return dispatch => {
    dispatch({ type: actionTypes.GETTING_CONTACTS });
    axios
      .get(endpoint)
      .then(response => {
        console.log("response ", response.data);
        dispatch({ type: actionTypes.GOT_CONTACTS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your contacts!" });
      });
  };
};

export const addContact = contact => {
  console.log("adding contact: ", contact);
  const endpoint = `${process.env.REACT_APP_API_URL}/api/contacts`;
  return dispatch => {
    dispatch({ type: actionTypes.ADDING_CONTACT });
    axios
      .post(endpoint, contact)
      .then(response => {
        console.log("response ", response.data);
        dispatch({ type: actionTypes.ADDED_CONTACT, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: actionTypes.ERROR, payload: "Can't fetch your contacts!" });
      });
  };
};
