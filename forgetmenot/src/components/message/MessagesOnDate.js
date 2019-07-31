import React from "react";

import { Messages } from "../../styles/messagesStyles";
import Message from "./Message";

const MessagesOnDate = ({ date }) => {
  const messages = [
    {
      recipient: "Lamia",
      email: "lamia@example.com",
      message: "Happy Birthday Lamia!!!",
      time: "10:00",
      type: "friend"
    },
    {
      recipient: "anissa",
      email: "anissa@example.com",
      message: "Good Job!!!",
      time: "15:00",
      type: "family"
    }
  ];
  return (
    <>
      <Messages>
        {messages.map(message => (
          <Message message={message} />
        ))}
      </Messages>
    </>
  );
};

export default MessagesOnDate;
