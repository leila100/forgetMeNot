import React from "react";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const MessagesList = ({ dates, row }) => {
  return (
    <Messages>
      {dates.map((date, i) => (
        <MessagesOnDate date={date} row={row} key={i} />
      ))}
    </Messages>
  );
};

export default MessagesList;
