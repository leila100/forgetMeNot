import { useReducer, useCallback } from "react";
import axios from "axios";

import reducer, { initialState } from "./reducer";
import { fetching, success, error } from "./actions";

axios.interceptors.request.use(
  (options) => {
    const token = localStorage.getItem("jwt");
    if (token) options.headers.authorization = token;
    return options;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useApiRequest = (endpoint, options = {}) => {
  const { verb = "get", params = {} } = options;
  const [state, dispatch] = useReducer(reducer, initialState);
  const makeRequest = useCallback(
    async (id) => {
      dispatch(fetching());
      try {
        if (id) endpoint += `/${id}`;
        const response = await axios[verb](endpoint, params);
        dispatch(success(response));
      } catch (e) {
        dispatch(error(e));
      }
    },
    [endpoint, verb, params]
  );
  return [state, makeRequest];
};

export default useApiRequest;
