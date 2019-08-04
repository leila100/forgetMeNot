import React from "react";
import moment from "moment";

import { Messages } from "../../styles/messagesStyles";
import { Date } from "../../styles/messagesStyles";
import Message from "./Message";

const MessagesOnDate = ({ date, row }) => {
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
      message: "Congratulations for the promotion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
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
      {messages.length > 0 && (
        <>
          <Date color={row}>{moment(date).format("dddd, MMMM Do YYYY")}</Date>
          <Messages row={row}>
            {messages.map(message => (
              <Message message={message} row={row} />
            ))}
          </Messages>
        </>
      )}
    </>
  );
};

export default MessagesOnDate;
