import axios from "axios";

export const FETCHING = "FETCHING";
export const FETCHED = "FETCHED";

export function fetchMessages() {
  return dispatch => {
    dispatch({ type: FETCHING });
    axios
      .get("http://localhost:5000/api/messages")
      .then(response => {
        dispatch({ type: FETCHED, payload: response.data });
      })
      .catch(error => {
        // dispatch({ type: ERROR, payload: "Can't fetch your messages!" });
      });
  };
}
