import React from "react";
import moment from "moment";

import { Button } from "../../styles/commonStyles";
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
      <Button>Schedule a message</Button>
    </Messages>
  );
};

export default MessagesList;
