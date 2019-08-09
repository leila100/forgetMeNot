import React from "react";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const MessagesList = ({ dates, row, updateMessage, deleteMessage }) => {
  return (
    <Messages>
      {dates.map((date, i) => (
        <MessagesOnDate date={date} row={row} key={i} updateMessage={updateMessage} deleteMessage={deleteMessage} />
      ))}
    </Messages>
  );
};

export default MessagesList;
