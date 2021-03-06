import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { useUser } from "../user/userContext";
import useApiRequest from "../../hooks/APIRequest/useApiRequest";
import { FETCHING, SUCCESS, ERROR } from "../../hooks/APIRequest/actionTypes";

import { FormWrapper, FormGroup } from "../../styles/formStyles";
import { Message, Button, Loader, Error } from "../../styles/commonStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#284243",
    fontSize: "1.6rem",
  },
  dialogContent: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0,
    },
  },
  title: {
    fontFamily: "Arimo",
    fontSize: "3rem",
    color: "#666680",
  },
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
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
    },
  },
  errors: {
    fontSize: "1.5rem",
  },
}));

const UserModal = ({ open, handleClose }) => {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useUser();
  const updateEndpoint = user && `${process.env.REACT_APP_API_URL}/api/user/${user.id}`;
  let [{ status: updateStatus, response: updateResponse }, updateRequest] = useApiRequest(updateEndpoint, {
    verb: "put",
    params: { ...user, name, email },
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
    setError("");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRequest();
    handleCancel();
  };

  useEffect(() => {
    if (updateStatus === SUCCESS) {
      const newUser = updateResponse.data.user;
      setUser(newUser);
    }
    if (updateStatus === ERROR) {
      setError("There was a problem updating your information!");
    }
  }, [updateStatus, name, email, setUser, updateResponse]);

  return (
    <>
      {updateStatus === FETCHING && (
        <Loader>
          <CircularProgress />
        </Loader>
      )}
      {error && <Error>{error}</Error>}
      {user && (
        <Dialog
          fullScreen={fullScreen}
          classes={{ root: classes.root }}
          fullWidth
          maxWidth='sm'
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          <DialogTitle id='form-dialog-title'>
            <span className={classes.title}>Settings - {user.username}</span>
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogContent }}>
            <FormWrapper style={{ margin: "auto" }}>
              {updateStatus === FETCHING && <CircularProgress />}
              <Message error>{user.errorMessage}</Message>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <i className='far fa-address-card' />
                  <TextField
                    autoFocus
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
              </form>
            </FormWrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default UserModal;
