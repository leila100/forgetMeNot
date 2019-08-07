import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/commonStyles";
import LeftBar from "../navbar/LeftBar";
import RightBar from "../navbar/RightBar";
import Calendar from "../calendar/Calendar";
import { addMessage, fetchMessages } from "../../store/actions/index";

const Information = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.messagesReducer);
  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

  console.log(state.messages);
  const handleAddMessage = message => {
    addMessage(message)(dispatch);
  };

  return (
    <Container>
      <LeftBar />
      <Calendar addMessageHandler={handleAddMessage} />
      <RightBar />
    </Container>
  );
};

export default Information;
