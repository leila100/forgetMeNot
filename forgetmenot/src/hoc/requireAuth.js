import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

axios.interceptors.request.use(
  options => {
    options.headers.authorization = localStorage.getItem("jwt");
    return options;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = <Redirect to='/login' />;
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
