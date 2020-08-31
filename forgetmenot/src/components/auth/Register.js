import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { Message, Button } from "../../styles/commonStyles";
import { FormWrapper, FormGroup, Footer } from "../../styles/formStyles";

import { useUser } from "../user/userContext";
import useApiRequest from "../../hooks/APIRequest/useApiRequest";
import { FETCHING, SUCCESS, ERROR } from "../../hooks/APIRequest/actionTypes";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  textField: {
    paddingRight: 20,
    width: "276px",
    marginTop: 20,
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formTextLabel: {
    fontSize: "1.5rem",
    color: "#4c688f",
  },
  formTextInput: {
    fontSize: "1.5rem",
  },
  errors: {
    fontSize: "1.5rem",
  },
}));

const Register = (props) => {
  const classes = useStyles();

  const [user, setUser] = useUser();

  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;
  const newUser = {
    username,
    password,
    name,
    email,
  };
  const [{ status: registerStatus, response: registerResponse }, registerRequest] = useApiRequest(endpoint, {
    verb: "post",
    params: newUser,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (user && token) props.history.push("/");
  });

  useEffect(() => {
    if (registerStatus === SUCCESS) {
      localStorage.setItem("jwt", registerResponse.data.token);
      setUser(registerResponse.data.user);
    }
    if (registerStatus === ERROR) {
      setError("register");
      setErrorText("There was a problem registering user");
      console.log(registerResponse);
    }
  }, [registerStatus, registerResponse, setUser]);

  const registerHandler = (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError("username");
      setErrorText("Please enter a valid username.");
    } else if (!password.trim()) {
      setError("password");
      setErrorText("Please enter a valid password.");
    } else {
      setError("");
      setErrorText("");
      registerRequest();
    }
  };

  return (
    <FormWrapper>
      {registerStatus === FETCHING && <CircularProgress />}
      {registerStatus === ERROR && <Message error>{errorText}</Message>}
      <form onSubmit={registerHandler}>
        <FormGroup>
          <i className='fas fa-user' />
          <TextField
            required
            error={error === "username"}
            helperText={error === "username" ? errorText : ""}
            autoFocus
            fullWidth
            margin='dense'
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel,
              },
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput,
              },
            }}
            FormHelperTextProps={{
              classes: {
                error: classes.errors,
              },
            }}
            classes={{ root: classes.textField }}
          />
        </FormGroup>
        <FormGroup>
          <i className='fas fa-lock' />
          <TextField
            required
            type='password'
            error={error === "password"}
            helperText={error === "password" ? errorText : ""}
            fullWidth
            margin='dense'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel,
              },
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput,
              },
            }}
            FormHelperTextProps={{
              classes: {
                error: classes.errors,
              },
            }}
            classes={{ root: classes.textField }}
          />
        </FormGroup>
        <FormGroup>
          <i className='far fa-address-card' />
          <TextField
            fullWidth
            margin='dense'
            label='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel,
              },
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput,
              },
            }}
            classes={{ root: classes.textField }}
          />
        </FormGroup>
        <FormGroup>
          <i className='fas fa-at' />
          <TextField
            type='email'
            fullWidth
            margin='dense'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel,
              },
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput,
              },
            }}
            classes={{ root: classes.textField }}
          />
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
