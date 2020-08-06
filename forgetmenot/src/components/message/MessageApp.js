import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "../auth/Register";
import Login from "../auth/Login";
import TopNav from "../navbar/TopNav";
import NewMessage from "./NewMessage";
import Messages from "./Messages";
import Calendar from "../calendar/Calendar";

const MessageApp = () => {
  return (
    <>
      <TopNav />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={NewMessage} />
        <Route path='/messages' component={Messages} />
        <Route path='/calendar' component={Calendar} />
      </Switch>
    </>
  );
};

export default MessageApp;
