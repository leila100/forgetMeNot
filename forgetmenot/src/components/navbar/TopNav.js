import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import logo from "../../assets/images/logo2.png";
import { TopBar } from "../../styles/navBarStyles";
import { Button } from "../../styles/commonStyles";
import { getCurrentUser } from "../../store/actions/index";

const TopNav = props => {
  const logout = () => {
    localStorage.removeItem("jwt");
    props.history.push("/login");
  };

  const user = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!user.currentUsername && token) getCurrentUser()(dispatch);
  }, [user.currentUsername, token, dispatch]);

  return (
    <TopBar>
      <>
        <img src={logo} alt='Forget Me Not logo' />
        {user.currentUsername && token ? (
          <div>
            <span>{`${user.currentUsername}`}</span>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </>
    </TopBar>
  );
};

export default withRouter(TopNav);
