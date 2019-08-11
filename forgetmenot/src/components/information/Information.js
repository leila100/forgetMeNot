import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import requireAuth from "../../hoc/requireAuth";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";

import { Container } from "../../styles/commonStyles";
import { MessagesContainer } from "../../styles/messagesStyles";
import LeftBar from "../navbar/LeftBar";
import Calendar from "../calendar/Calendar";
import MessagesList from "../message/MessagesList";
import { addMessage, fetchMessages, updateMessage, deleteMessage } from "../../store/actions/index";

const Information = ({ match }) => {
  console.log({ match });
  const dispatch = useDispatch();
  const { fetching, adding, updating, messages } = useSelector(state => state.messagesReducer);

  // Store all the dates in a unique array
  const dates = messages.map(message => message.date);
  const uniqueDates = [];
  const dt = [];
  dates.forEach(d => {
    if (dt.indexOf(moment(d).format("YYYY-MM-DD")) === -1) {
      dt.push(moment(d).format("YYYY-MM-DD"));
      uniqueDates.push(d);
    }
  });

  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

  const addMessageHandler = message => {
    addMessage(message)(dispatch);
  };

  const updateMessageHandler = (messageId, message) => {
    updateMessage(messageId, message)(dispatch);
  };

  const deleteMessageHandler = messageId => {
    deleteMessage(messageId)(dispatch);
  };

  return (
    <>
      {(fetching || adding || updating) && <CircularProgress />}
      <Container>
        <LeftBar />
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <Calendar
              {...props}
              addMessage={addMessageHandler}
              updateMessage={updateMessageHandler}
              deleteMessage={deleteMessageHandler}
            />
          )}
        />
        <Route
          path={`${match.path}messages`}
          render={props => (
            <MessagesContainer>
              <MessagesList
                {...props}
                dates={uniqueDates}
                row
                updateMessage={updateMessageHandler}
                deleteMessage={deleteMessageHandler}
              />
            </MessagesContainer>
          )}
        />
      </Container>
    </>
  );
};

export default requireAuth(Information);
