import React from "react";
import moment from "moment";

import { SideBar } from "../../styles/navBarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";

const LeftBar = () => {
  const dates = [];
  dates.push(Date.now());
  for (let i = 0; i < 2; i++) dates.push(moment().add(1 + i, "days"));
  console.log({ dates });
  return (
    <SideBar right>
      <h2>Messages</h2>
      <MessagesList dates={dates} />
      <Button>See more messages</Button>
    </SideBar>
  );
};

export default LeftBar;
