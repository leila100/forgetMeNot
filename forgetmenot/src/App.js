import React from "react";
import { Route, Switch } from "react-router-dom";

import MessageApp from "./components/message/MessageApp";
import { UserProvider } from "./components/user/userContext";
import TopNav from "./components/navbar/TopNav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

require("dotenv").config();

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route path='/' component={MessageApp} />
      </Switch>
    </UserProvider>
  );
}

export default App;
