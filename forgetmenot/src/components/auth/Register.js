import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { Message, Button } from "../../styles/commonStyles";
import { FormWrapper, FormGroup, Footer } from "../../styles/formStyles";

import { addUser } from "../../store/actions/index";

require("dotenv").config();

const styles = theme => ({
  textField: {
    paddingRight: 20,
    width: "276px",
    marginTop: 20,
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  formTextLabel: {
    fontSize: "1.5rem",
    color: "#4c688f"
  },
  formTextInput: {
    fontSize: "1.5rem"
  },
  errors: {
    fontSize: "1.5rem"
  }
});

const Register = props => {
  const { classes } = props;

  const state = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (state.currentUser && token) props.history.push("/");
  });

  const registerHandler = event => {
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
      const newUser = {
        username,
        password,
        name,
        email
      };
      addUser(newUser)(dispatch);
    }
  };

  return (
    <FormWrapper>
      {state.adding && <CircularProgress />}
      <Message error>{state.errorMessage}</Message>
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
            onChange={e => setUsername(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput
              }
            }}
            FormHelperTextProps={{
              classes: {
                error: classes.errors
              }
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
            autoFocus
            fullWidth
            margin='dense'
            label='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput
              }
            }}
            FormHelperTextProps={{
              classes: {
                error: classes.errors
              }
            }}
            classes={{ root: classes.textField }}
          />
        </FormGroup>
        <FormGroup>
          <i className='far fa-address-card' />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            label='Full Name'
            value={name}
            onChange={e => setName(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput
              }
            }}
            classes={{ root: classes.textField }}
          />
        </FormGroup>
        <FormGroup>
          <i className='fas fa-at' />
          <TextField
            type='email'
            autoFocus
            fullWidth
            margin='dense'
            label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.formTextLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.formTextInput
              }
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

export default withStyles(styles)(Register);
