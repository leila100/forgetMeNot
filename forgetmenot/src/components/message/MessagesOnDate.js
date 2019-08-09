import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { Messages } from "../../styles/messagesStyles";
import { Date } from "../../styles/messagesStyles";
import Message from "./Message";
import MessageModal from "../messageModal/MessageModal";

const MessagesOnDate = ({ date, row, updateMessage, deleteMessage }) => {
  const messagesList = useSelector(state => state.messagesReducer).messages;
  const messages = messagesList.filter(
    message => moment(message.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
  );

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  function handleClickOpen(message) {
    setOpen(true);
    setMessage(message);
  }

  function handleClose() {
    setOpen(false);
    setMessage(null);
  }
  const handleUpdate = updatedMessage => {
    updateMessage(message.id, updatedMessage);
  };

  return (
    <>
      {messages.length > 0 && (
        <>
          <Date textColor={row}>{moment(date).format("dddd, MMMM Do YYYY")}</Date>
          <Messages row={row}>
            {messages.map(message => (
              <Message
                message={message}
                row={row}
                handleOpen={handleClickOpen}
                deleteMessage={deleteMessage}
                key={message.id}
              />
            ))}
          </Messages>
          <MessageModal
            open={open}
            handleClose={handleClose}
            date={date}
            handleSubmit={handleUpdate}
            message={message}
          />
        </>
      )}
    </>
  );
};

export default MessagesOnDate;
