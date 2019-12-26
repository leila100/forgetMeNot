import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, withRouter, Link } from "react-router-dom";

import logo from "../../assets/images/logo2.png";
import { TopBar } from "../../styles/navBarStyles";
import { Button, Group } from "../../styles/commonStyles";
import { getCurrentUser } from "../../store/actions/index";
import UserModal from "../user/UserModal";

import { updateUser } from "../../store/actions/index";

const TopNav = props => {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.usersReducer).currentUser;
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    props.history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // if (!token) props.history.push("/login");
    if (!user && token) getCurrentUser()(dispatch);
  }, [user, token, dispatch, props.history]);

  const updateHandler = ({ name, email }) => {
    const updatedUser = {
      ...user,
      name,
      email
    };
    updateUser(user.id, updatedUser)(dispatch);
  };

  return (
    <TopBar>
      <>
        <Link to='/'>
          <img src={logo} alt='Forget Me Not logo' />
        </Link>
        {user && token ? (
          <>
            <Group>
              <div id='links'>
                <NavLink exact to='/'>
                  Write a message
                </NavLink>
                <NavLink exact to='/messages'>
                  Messages
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
          <NavLink to='/login'>Login</NavLink>
        )}
        <UserModal open={open} handleClose={handleClose} update={updateHandler} />
      </>
    </TopBar>
  );
};

export default withRouter(TopNav);
