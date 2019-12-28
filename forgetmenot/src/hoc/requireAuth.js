import React from "react";
import { Redirect } from "react-router-dom";

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = <Redirect to='/login' />;
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
