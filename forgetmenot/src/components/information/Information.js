import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import requireAuth from "../../hoc/requireAuth";
import { CircularProgress } from "@material-ui/core";

import { Container } from "../../styles/commonStyles";
import LeftBar from "../navbar/LeftBar";
import RightBar from "../navbar/RightBar";
import Calendar from "../calendar/Calendar";
import { addMessage, fetchMessages, updateMessage, deleteMessage } from "../../store/actions/index";

const Information = () => {
  const dispatch = useDispatch();
  const { fetching, adding, updating } = useSelector(state => state.messagesReducer);

  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

  const addMessageHandler = message => {
    addMessage(message)(dispatch);
  };

  const updateMessageHandler = (messageId, message) => {
    updateMessage(messageId, message)(dispatch);
    fetchMessages()(dispatch);
  };

  const deleteMessageHandler = messageId => {
    deleteMessage(messageId)(dispatch);
  };

  return (
    <>
      {(fetching || adding || updating) && <CircularProgress />}
      <Container>
        <LeftBar />
        <Calendar
          addMessage={addMessageHandler}
          updateMessage={updateMessageHandler}
          deleteMessage={deleteMessageHandler}
        />
        <RightBar updateMessage={updateMessageHandler} deleteMessage={deleteMessageHandler} />
      </Container>
    </>
  );
};

export default requireAuth(Information);
