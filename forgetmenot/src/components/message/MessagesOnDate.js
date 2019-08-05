import React, { useState } from "react";
import moment from "moment";

import { Messages } from "../../styles/messagesStyles";
import { Date } from "../../styles/messagesStyles";
import Message from "./Message";
import MessageModal from "../messageModal/MessageModal";

const MessagesOnDate = ({ date, row }) => {
  const messages = [
    {
      id: 1,
      recipient: "Lamia",
      email: "lamia@example.com",
      messageText: "Happy Birthday Lamia!!!",
      date: "08/04/2019",
      time: "10:00",
      type: "friend"
    },
    {
      id: 2,
      recipient: "Anissa",
      email: "anissa@example.com",
      messageText: "Good Job!!!",
      date: "08/04/2019",
      time: "15:00",
      type: "family"
    },
    {
      id: 3,
      recipient: "coworker",
      email: "worker@example.com",
      messageText: "Congratulations for the promotion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      date: "08/04/2019",
      time: "08:00",
      type: "work"
    },
    {
      id: 4,
      recipient: "neighbor",
      email: "neighbor@example.com",
      messageText: "Welcome to the neighborhood!!!",
      date: "08/04/2019",
      time: "09:00",
      type: ""
    }
  ];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  function handleClickOpen(message) {
    console.log("OPEN", message);
    setOpen(true);
    setMessage(message);
  }

  function handleClose() {
    setOpen(false);
    setMessage(null);
  }
  const handleSubmit = message => {
    console.log("Updating message: ", { message });
  };

  return (
    <>
      {messages.length > 0 && (
        <>
          <Date textColor={row}>{moment(date).format("dddd, MMMM Do YYYY")}</Date>
          <Messages row={row}>
            {messages.map(message => (
              <Message message={message} row={row} handleOpen={handleClickOpen} key={message.id} />
            ))}
          </Messages>
          <MessageModal
            open={open}
            handleClose={handleClose}
            date={date}
            handleSubmit={handleSubmit}
            message={message}
          />
        </>
      )}
    </>
  );
};

export default MessagesOnDate;
