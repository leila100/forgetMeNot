import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";

import { useUser } from "../user/userContext";

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
  const [user, setUser] = useUser();
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentContact, setCurrentContact] = useState();
  const [updateMessage, setUpdateMessage] = useState();
  const [error, setError] = useState();
  const [messageId, setMessageId] = useState();
  const [deleteEndpoint, setDeleteEndpoint] = useState();
  const [updateEndpoint, setUpdateEndpoint] = useState();
  const [update, setUpdate] = useState(false);
  const endpoint = `${process.env.REACT_APP_API_URL}/api/reminders`;
  const contactsEndpoint = `${process.env.REACT_APP_API_URL}/api/contacts`;
  const userEndpoint = `${process.env.REACT_APP_API_URL}/api/user`;

  const [{ status: userStatus, response: userResponse }, userRequest] = useApiRequest(userEndpoint, { verb: "get" });
  const [{ status, response }, fetchRequest] = useApiRequest(endpoint, { verb: "get" });
  const [{ status: contactsStatus, response: contactsResponse }, fetchContactsRequest] = useApiRequest(
    contactsEndpoint,
    { verb: "get" }
  );
  const [{ status: addStatus, response: addResponse }, addRequest] = useApiRequest(endpoint, {
    verb: "post",
    params: currentMessage,
  });
  const [{ status: addContactStatus, response: addContactResponse }, addContactRequest] = useApiRequest(
    contactsEndpoint,
    {
      verb: "post",
      params: currentContact,
    }
  );
  const [{ status: updateStatus, response: updateResponse }, updateRequest] = useApiRequest(updateEndpoint, {
    verb: "put",
    params: currentMessage,
  });
  const [{ status: deleteStatus }, deleteRequest] = useApiRequest(deleteEndpoint, { verb: "delete" });

  useEffect(() => {
    if (user) {
      // fetch only when user exists/changes
      fetchRequest();
      fetchContactsRequest();
    } else {
      // Get current user
      userRequest();
    }
  }, [fetchRequest, fetchContactsRequest, user, userRequest]);

  useEffect(() => {
    if (userStatus === SUCCESS) {
      setUser(userResponse.data.user);
    }
  }, [userStatus, userResponse, setUser]);

  useEffect(() => {
    if (status === SUCCESS) {
      setMessages(response.data);
      setError();
    }
    if (status === ERROR) {
      // setError("There was a problem getting your previous messages. Please login");
      console.log(response);
    }
  }, [status, response]);

  useEffect(() => {
    if (contactsStatus === SUCCESS) {
      setContacts(contactsResponse.data);
      setError();
    }
    if (contactsStatus === ERROR) {
      // setError("There was a problem getting the contacts. Please login");
      console.log(contactsResponse);
    }
  }, [contactsStatus, contactsResponse]);

  useEffect(() => {
    if (deleteEndpoint) {
      deleteRequest();
      setDeleteEndpoint();
    }
  }, [deleteEndpoint, deleteRequest]);

  useEffect(() => {
    if (deleteStatus === ERROR) setError("There was a problem deleting the message!");
    if (deleteStatus === SUCCESS) {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
      setError();
    }
  }, [deleteStatus, messageId]);

  useEffect(() => {
    if (currentMessage && !update) {
      addRequest();
    }
    if (currentMessage && update) {
      updateRequest();
    }
  }, [currentMessage, addRequest, updateRequest, update]);

  useEffect(() => {
    if (currentContact) {
      addContactRequest();
    }
  }, [currentContact, addContactRequest]);

  useEffect(() => {
    if (addStatus === SUCCESS) {
      setMessages((prevMessages) => [addResponse.data, ...prevMessages]);
      setCurrentMessage();
      setError();
    }
    if (addStatus === ERROR) {
      setError("There was a problem adding the new message!");
    }
  }, [addStatus, addResponse]);

  useEffect(() => {
    if (addContactStatus === SUCCESS) {
      setContacts((prevContacts) => [addContactResponse.data, ...prevContacts]);
      setCurrentContact();
      setError();
    }
    if (addContactStatus === ERROR) {
      setError("There was a problem adding the new contact!");
    }
  }, [addContactStatus, addContactResponse]);

  useEffect(() => {
    if (updateStatus === SUCCESS) {
      const updatedMessages = [...messages];
      const index = updatedMessages.findIndex((message) => message.id === updateMessage.id);
      updatedMessages[index] = { ...updatedMessages[index], ...currentMessage };
      setMessages(updatedMessages);
      setCurrentMessage();
      setUpdateMessage();
      setUpdate(false);
      setError();
    }
    if (updateStatus === ERROR) {
      setError("There was a problem updating your message!");
    }
  }, [updateStatus, updateResponse]);

  const deleteHandler = (id) => {
    setDeleteEndpoint(endpoint + `/${id}`);
    setMessageId(id);
  };

  const messageClickHandler = (message) => {
    if (!message.sent) {
      if (message.id) {
        setUpdateEndpoint(endpoint + `/${message.id}`);
        setUpdate(true);
      }
      setUpdateMessage(message);
      setError();
    } else {
      setUpdateMessage();
      setError("Sorry, your message was already sent.");
    }
  };

  const checkContact = (email) => {
    const exist = contacts.find((contact) => contact.contactEmail === email);
    if (exist) return true;
    return false;
  };

  const addHandler = (message) => {
    // check if recipient in contacts
    if (!checkContact(message.recipientEmail)) {
      setCurrentContact({ contactName: message.recipientName, contactEmail: message.recipientEmail });
    }
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
      {error && <Error>{error}</Error>}
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route
        exact
        path='/'
        render={(props) => (
          <>
            <TopNav />
            <NewMessage savedMessage={updateMessage} onAdd={addHandler} contacts={contacts} {...props} />
          </>
        )}
      />
      <Route
        exact
        path='/messages'
        render={(props) => (
          <>
            <TopNav />
            <Messages
              messages={sortedMessages}
              onDelete={deleteHandler}
              {...props}
              onMessageClick={messageClickHandler}
              setError={setError}
            />
          </>
        )}
      />
      <Route
        path='/calendar'
        render={(props) => (
          <>
            <TopNav />
            <Calendar
              messages={messages}
              onDelete={deleteHandler}
              {...props}
              onMessageClick={messageClickHandler}
              setError={setError}
            />
          </>
        )}
      />
    </>
  );
};

export default MessageApp;
