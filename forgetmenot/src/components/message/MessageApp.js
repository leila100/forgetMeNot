import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";

import Register from "../auth/Register";
import Login from "../auth/Login";
import TopNav from "../navbar/TopNav";
import NewMessage from "./NewMessage";
import Messages from "./Messages";
import Calendar from "../calendar/Calendar";
import useApiRequest from "../../hooks/APIRequest/useApiRequest";
import { FETCHING, SUCCESS, ERROR } from "../../hooks/APIRequest/actionTypes";
import { Loader, Error } from "../../styles/commonStyles";

const MessageApp = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();
  const [messageId, setMessageId] = useState();
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  const [{ status, response }, fetchRequest] = useApiRequest(endpoint, { verb: "get" });
  const [{ status: deleteStatus }, deleteRequest] = useApiRequest(endpoint, {
    verb: "delete",
  });

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    if (status === SUCCESS) {
      setMessages(response.data);
    }
    if (status === ERROR || deleteStatus === ERROR) setError("There was a problem!");
    else setError();
    if (deleteStatus === SUCCESS) {
      const updatedMessages = messages.filter((message) => message.id !== messageId);
      setMessages(updatedMessages);
    }
  }, [status, response, deleteStatus, messageId, messages]);

  const deleteHandler = (id) => {
    setMessageId(id);
    deleteRequest(id);
  };
  const filteredMessages = messages.sort((a, b) => {
    if (moment(new Date(a.date)).isSameOrBefore(new Date(b.date))) return 1;
    else return -1;
  });
  return (
    <>
      {(status === FETCHING || deleteStatus === FETCHING) && (
        <Loader>
          <CircularProgress />
        </Loader>
      )}
      {deleteStatus === ERROR && <Error>{error}</Error>}
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route path='/' component={TopNav} />
      <Route exact path='/' component={NewMessage} />
      <Route
        exact
        path='/messages'
        render={(props) => <Messages messages={filteredMessages} onDelete={deleteHandler} {...props} />}
      />
      <Route path='/calendar' component={Calendar} />
    </>
  );
};

export default MessageApp;
