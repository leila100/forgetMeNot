import React from "react";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const MessagesList = ({ dates, row, updateMessage }) => {
  return (
    <Messages>
      {dates.map((date, i) => (
        <MessagesOnDate date={date} row={row} key={i} updateMessage={updateMessage} />
      ))}
    </Messages>
  );
};

export default MessagesList;
