import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { FormWrapper, FormGroup } from "../../styles/formStyles";
import { Message, Button } from "../../styles/commonStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    backgroundColor: "#284243",
    fontSize: "1.6rem"
  },
  title: {
    fontFamily: "Arimo",
    fontSize: "3rem",
    color: "#666680"
  },
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

const UserModal = ({ open, handleClose, update, classes }) => {
  const state = useSelector(state => state.usersReducer);
  const user = state.currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
    handleClose();
  };

  const handleSubmit = e => {
    e.preventDefault();
    update({ name, email });
    handleCancel();
  };

  return (
    <>
      {user && (
        <Dialog
          classes={{ root: classes.root }}
          fullWidth
          maxWidth='sm'
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          <DialogTitle id='form-dialog-title'>
            <span className={classes.title}>Update User {user.username} Settings</span>
          </DialogTitle>
          <DialogContent>
            <FormWrapper style={{ margin: "auto" }}>
              {state.updating && <CircularProgress />}
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

export default withStyles(styles)(UserModal);
