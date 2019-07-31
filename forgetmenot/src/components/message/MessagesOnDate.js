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
      recipient: "Anissa",
      email: "anissa@example.com",
      message: "Good Job!!!",
      time: "15:00",
      type: "family"
    },
    {
      recipient: "coworker",
      email: "worker@example.com",
      message: "Congratulations for the promotion!!!",
      time: "8:00",
      type: "work"
    },
    {
      recipient: "neighbor",
      email: "neighbor@example.com",
      message: "Welcome to the neighborhood!!!",
      time: "9:00",
      type: ""
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
