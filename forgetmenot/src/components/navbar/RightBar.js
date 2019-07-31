import React from "react";

import { SideBar } from "../../styles/navBarStyles";

const LeftBar = () => {
  return (
    <SideBar right>
      <h1>Messages</h1>
      <div>Today</div>
      <div>....</div>
    </SideBar>
  );
};

export default LeftBar;
