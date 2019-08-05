import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Message } from "../../styles/commonStyles";
import { FormWrapper, FormGroup, Button, Footer } from "../../styles/formStyles";
import { addUser } from "../../store/actions/index";

require("dotenv").config();

const Register = props => {
  const state = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.currentUsername) props.history.push("/");
  });

  const registerHandler = event => {
    event.preventDefault();
    const newUser = {
      username,
      password,
      name,
      email
    };
    addUser(newUser)(dispatch);
  };

  return (
    <FormWrapper>
      <Message error>{state.errorMessage}</Message>
      <form onSubmit={registerHandler}>
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
        <FormGroup>
          <i className='far fa-address-card' />
          <input type='text' placeholder='Full Name' name='name' value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <i className='fas fa-at' />
          <input type='email' placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <Button type='submit'>
          <i className='fas fa-user-plus' /> Register
        </Button>
        <Footer>
          Already registered: <Link to='/login'>Login</Link>
        </Footer>
      </form>
    </FormWrapper>
  );
};

export default Register;
