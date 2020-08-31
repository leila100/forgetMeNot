import React, { useState } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";

import { useUser } from "../user/userContext";

import logo from "../../assets/images/logo.png";
import { TopBar, Logo } from "../../styles/navBarStyles";
import { Button, Group } from "../../styles/commonStyles";
import UserModal from "../user/UserModal";

const TopNav = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useUser();
  const token = localStorage.getItem("jwt");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser();
    history.push("/login");
  };

  return (
    <TopBar>
      <>
        <Link to='/'>
          <Logo>
            <img src={logo} alt='Forget Me Not logo' />
            <div>ForgetMeNot</div>
          </Logo>
        </Link>
        {user && token ? (
          <>
            <Group>
              <div id='links'>
                <NavLink exact to='/'>
                  New
                </NavLink>
                <NavLink exact to='/messages'>
                  Messages
                </NavLink>
                <NavLink exact to='/calendar'>
                  Calendar
                </NavLink>
              </div>
              <div>
                <span>{`${user.username}`}</span>
                <i className='fas fa-edit' onClick={handleOpen} />
              </div>
              <Button onClick={logout}>Logout</Button>
            </Group>
          </>
        ) : (
          <Button onClick={() => history.push("/login")}>Login</Button>
        )}
        <UserModal open={open} handleClose={handleClose} />
      </>
    </TopBar>
  );
};

export default withRouter(TopNav);
