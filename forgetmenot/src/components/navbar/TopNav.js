import React from "react";
import { useSelector } from "react-redux";

import logo from "../../assets/images/logo2.png";
import { TopBar } from "../../styles/navBarStyles";

const TopNav = () => {
  const user = useSelector(state => state.usersReducer).currentUsername;
  return (
    <TopBar>
      <img src={logo} alt='Forget Me Not logo' />
      <div>{`${user}`}</div>
    </TopBar>
  );
};

export default TopNav;
