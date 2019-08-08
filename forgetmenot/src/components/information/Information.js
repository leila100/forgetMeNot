import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import requireAuth from "../../hoc/requireAuth";

import { Container } from "../../styles/commonStyles";
import LeftBar from "../navbar/LeftBar";
import RightBar from "../navbar/RightBar";
import Calendar from "../calendar/Calendar";
import { addMessage, fetchMessages } from "../../store/actions/index";

const Information = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.messagesReducer);

  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

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

export default requireAuth(Information);
