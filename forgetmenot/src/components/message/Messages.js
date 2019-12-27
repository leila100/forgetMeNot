import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

import requireAuth from "../../hoc/requireAuth";
import TopNavBar from "../navbar/TopNav";
import { fetchMessages, deleteMessage, saveCurrentMessage } from "../../store/actions/index";
import { Container } from "../../styles/commonStyles";
import { MessagesContainer } from "../../styles/messagesStyles";
import MessagesList from "../message/MessagesList";

const Messages = () => {
  const dispatch = useDispatch();
  const { fetching, adding, updating, messages } = useSelector(state => state.messagesReducer);
  // Store all the dates in a unique array
  const dates = messages.map(message => message.date);
  const uniqueDates = [];
  const dt = [];

  useEffect(() => {
    if (messages.length === 0) fetchMessages()(dispatch);
  }, []);

  dates.forEach(d => {
    if (dt.indexOf(moment(d).format("YYYY-MM-DD")) === -1) {
      dt.push(moment(d).format("YYYY-MM-DD"));
      uniqueDates.push(d);
    }
  });
  if (uniqueDates.length > 0) {
    uniqueDates.sort((a, b) => {
      if (moment(new Date(a)).isSameOrBefore(new Date(b))) return -1;
      else return 1;
    });
  }

  const deleteMessageHandler = messageId => {
    deleteMessage(messageId)(dispatch);
  };

  const handleSetUpdate = message => {
    saveCurrentMessage(message)(dispatch);
  };

  return (
    <>
      <TopNavBar />
      {(fetching || adding || updating) && <CircularProgress />}
      <Container>
        <MessagesContainer>
          <MessagesList dates={uniqueDates} row deleteMessage={deleteMessageHandler} setUpdate={handleSetUpdate} />
        </MessagesContainer>
      </Container>
    </>
  );
};

export default requireAuth(Messages);
