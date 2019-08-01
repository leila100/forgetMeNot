import React from "react";

import { Messages } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const MessagesList = ({ dates, row }) => {
  return (
    <Messages>
      {dates.map(date => (
        <>
          <MessagesOnDate date={date} row={row} />
        </>
      ))}
    </Messages>
  );
};

export default MessagesList;
