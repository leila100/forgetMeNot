import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { Message, Button } from "../../styles/commonStyles";
import { FormWrapper, FormGroup, Footer } from "../../styles/formStyles";

import { useUser } from "../user/userContext";
import useApiRequest from "../../hooks/APIRequest/useApiRequest";
import { FETCHING, SUCCESS, ERROR } from "../../hooks/APIRequest/actionTypes";

const styles = (theme) => ({
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
});

const Login = (props) => {
  const { classes } = props;
  const [user, setUser] = useUser();

  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
  const [{ status: loginStatus, response: loginResponse }, loginRequest] = useApiRequest(endpoint, {
    verb: "post",
    params: { username, password },
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (user && token) props.history.push("/");
  });

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      localStorage.setItem("jwt", loginResponse.data.token);
      setUser(loginResponse.data.user);
    }
    if (loginStatus === ERROR) {
      setError("login");
      setErrorText("There was a problem logging in user");
      console.log(loginResponse);
    }
  }, [loginStatus, loginResponse, setUser]);

  const loginHandler = (event) => {
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
      loginRequest();
    }
  };

  return (
    <FormWrapper>
      {loginStatus === FETCHING && <CircularProgress />}
      {error === "login" ? <Message error>{errorText}</Message> : null}
      <form onSubmit={loginHandler}>
        <FormGroup>
          <i className='fas fa-user' />
          <TextField
            required
            autoFocus
            error={error === "username"}
            helperText={error === "username" ? errorText : ""}
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

export default withStyles(styles)(Login);
