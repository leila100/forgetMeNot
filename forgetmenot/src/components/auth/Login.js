import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Message } from "../../styles/commonStyles";
import { FormWrapper, FormGroup, Button, Footer } from "../../styles/formStyles";

import { logUser } from "../../store/actions/index";

const Login = props => {
  const state = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.currentUsername) props.history.push("/");
  });

  const loginHandler = event => {
    event.preventDefault();
    logUser({ username, password })(dispatch);
  };

  return (
    <FormWrapper>
      <Message error>{state.errorMessage}</Message>
      <form onSubmit={loginHandler}>
        <FormGroup>
          <i className='fas fa-user' />
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <i className='fas fa-lock' />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type='submit'>
          <i className='fas fa-sign-in-alt' /> Login
        </Button>
        <Footer>
          Have to register? <Link to='/Register'>Register</Link>
        </Footer>
      </form>
    </FormWrapper>
  );
};

export default Login;
