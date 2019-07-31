import React from "react";
import moment from "moment";

import { Messages, Date } from "../../styles/messagesStyles";
import MessagesOnDate from "./MessagesOnDate";

const MessagesList = ({ dates }) => {
  return (
    <Messages>
      {dates.map(date => (
        <>
          <Date>{moment(date).format("ddd, MMM DD YYYY")}</Date>
          <MessagesOnDate date={date} />
        </>
      ))}
    </Messages>
  );
};

export default MessagesList;
