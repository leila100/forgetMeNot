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
  // const [update, setUpdate] = useState(false)
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  const [{ status, response }, fetchRequest] = useApiRequest(endpoint, { verb: "get" });
  const [{ status: addStatus, response: addResponse }, addRequest] = useApiRequest(endpoint, {
    verb: "post",
    params: currentMessage,
  });
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
    if (currentMessage) {
      addRequest();
    }
  }, [currentMessage, addRequest]);

  useEffect(() => {
    if (addStatus === SUCCESS) {
      setMessages((prevMessages) => [addResponse.data, ...prevMessages]);
      setCurrentMessage();
      setError();
    }
    if (addStatus === ERROR) {
      setError("There was a problem!");
    }
  }, [addStatus, addResponse]);

  useEffect(() => {
    if (status === SUCCESS) {
      setMessages(response.data);
      setError();
    }
    if (status === ERROR) {
      setError("There was a problem!");
      console.log(response);
    }
  }, [status, response]);

  const deleteHandler = (id) => {
    setDeleteEndpoint(endpoint + `/${id}`);
    setMessageId(id);
  };

  const messageClickHandler = (message) => {
    setCurrentMessage(message);
  };

  const addHandler = (message) => {
    setCurrentMessage(message);
  };

  const sortedMessages = messages.sort((a, b) => {
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
      <Route
        exact
        path='/'
        render={(props) => <NewMessage currentMessage={currentMessage} onAdd={addHandler} {...props} />}
      />
      <Route
        exact
        path='/messages'
        render={(props) => (
          <Messages
            messages={sortedMessages}
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
