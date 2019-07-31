import React from "react";

import { Messages } from "../../styles/messagesStyles";

const MessagesList = ({ dates }) => {
  return (
    <Messages>
      {dates.map(date => (
        <li>{date}</li>
      ))}
    </Messages>
  );
};

export default MessagesList;
