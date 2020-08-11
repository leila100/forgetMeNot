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
  const [currentMessage, setCurrentMessage] = useState();
  const [error, setError] = useState();
  const [messageId, setMessageId] = useState();
  const [deleteEndpoint, setDeleteEndpoint] = useState();
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  const [{ status, response }, fetchRequest] = useApiRequest(endpoint, { verb: "get" });
  const [{ status: deleteStatus }, deleteRequest] = useApiRequest(deleteEndpoint, { verb: "delete" });

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  useEffect(() => {
    if (deleteEndpoint) {
      deleteRequest();
      setDeleteEndpoint();
    }
  }, [deleteEndpoint, deleteRequest]);

  useEffect(() => {
    if (deleteStatus === ERROR) setError("There was a problem!");
    if (deleteStatus === SUCCESS) {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
      setError();
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (status === SUCCESS) {
      setMessages(response.data);
    }
    if (status === ERROR) setError("There was a problem!");
    else setError();
  }, [status, response]);

  const deleteHandler = async (id) => {
    setDeleteEndpoint(endpoint + `/${id}`);
    setMessageId(id);
  };

  const messageClickHandler = (message) => {
    setCurrentMessage(message);
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
      <Route exact path='/' render={(props) => <NewMessage currentMessage={currentMessage} {...props} />} />
      <Route
        exact
        path='/messages'
        render={(props) => (
          <Messages
            messages={filteredMessages}
            onDelete={deleteHandler}
            {...props}
            onMessageClick={messageClickHandler}
          />
        )}
      />
      <Route path='/calendar' component={Calendar} />
    </>
  );
};

export default MessageApp;
