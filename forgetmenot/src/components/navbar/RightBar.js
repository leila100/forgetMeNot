import React from "react";
import moment from "moment";

import { SideBar } from "../../styles/navBarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";

const RightBar = ({ updateMessage, deleteMessage }) => {
  const dates = [];
  dates.push(moment());
  for (let i = 0; i < 2; i++) dates.push(moment().add(1 + i, "days"));
  return (
    <SideBar right>
      <h2>Messages</h2>
      <MessagesList dates={dates} updateMessage={updateMessage} deleteMessage={deleteMessage} />
      <Button>See more messages</Button>
    </SideBar>
  );
};

export default RightBar;
