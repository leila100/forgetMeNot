import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { Messages } from "../../styles/messagesStyles";
import { DateFormat } from "../../styles/messagesStyles";
import Message from "./Message";

const MessagesOnDate = ({ date, row, setUpdate, deleteMessage, showSent, showType }) => {
  const messagesList = useSelector(state => state.messagesReducer).messages;
  let messages = messagesList.filter(
    message => moment(message.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
  );
  if (!showSent) messages = messages.filter(message => !message.sent);
  if (showType !== "all") messages = messages.filter(message => message.type === showType);
  if (messages.length > 0)
    messages.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);
      if (moment(d1).isSameOrBefore(d2)) return -1;
      else return 1;
    });

  return (
    <>
      {messages.length > 0 ? (
        <>
          <DateFormat textColor={row}>{moment(date).format("dddd, MMMM Do YYYY")}</DateFormat>
          <Messages row={row}>
            {messages.map(message => (
              <Message
                message={message}
                row={row}
                setUpdate={setUpdate}
                deleteMessage={deleteMessage}
                key={message.id}
              />
            ))}
          </Messages>
        </>
      ) : (
        <div>No message scheduled on {moment(date).format("dddd, MMMM Do YYYY")}</div>
      )}
    </>
  );
};

export default MessagesOnDate;
