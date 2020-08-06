import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Register from "../auth/Register";
import Login from "../auth/Login";
import TopNav from "../navbar/TopNav";
import NewMessage from "./NewMessage";
import Messages from "./Messages";
import Calendar from "../calendar/Calendar";
import useApiRequest from "../../hooks/APIRequest/useApiRequest";
import { FETCHING, SUCCESS, ERROR } from "../../hooks/APIRequest/actionTypes";

const MessageApp = () => {
  const [messages, setMessages] = useState([]);
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  const options = { verb: "get" };
  const [{ status, response }, makeRequest] = useApiRequest(endpoint, options);

  useEffect(() => {
    makeRequest();
  }, []);

  useEffect(() => {
    if (status === SUCCESS) {
      setMessages(response.data);
    }
  }, [status, response]);
  return (
    <>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route path='/' component={TopNav} />
      <Route exact path='/' component={NewMessage} />
      <Route path='/messages' render={(props) => <Messages messages={messages} {...props} />} />
      <Route path='/calendar' component={Calendar} />
    </>
  );
};

export default MessageApp;
