import React from "react";
import { NavLink } from "react-router-dom";

import { SideBar } from "../../styles/navBarStyles";

const LeftBar = () => {
  return (
    <SideBar>
      <NavLink exact to='/'>
        Calendar
      </NavLink>
      <NavLink exact to='/messages'>
        Messages
      </NavLink>
    </SideBar>
  );
};

export default LeftBar;
