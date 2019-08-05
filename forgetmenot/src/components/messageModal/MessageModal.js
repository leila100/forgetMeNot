import React, { useState, useEffect } from "react";
import * as moment from "moment";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "../../styles/commonStyles";
import { BtnGroup, TypeBtn, InputGroup } from "../../styles/modalStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    backgroundColor: "#284243"
  },
  title: {
    fontFamily: "Arimo",
    fontSize: "3rem",
    color: "#666680"
  },
  family: {
    backgroundColor: "#b87a71",
    "&:clicked": {
      backgroundColor: "#284243"
    }
  },
  textField: {
    paddingRight: 20,
    width: "250px",
    marginTop: 20,
    fontSize: "1.6rem"
  },
  textAreaField: {
    paddingRight: 20,
    width: "70%",
    marginTop: 20,
    fontSize: "1.6rem"
  },
  friend: {
    backgroundColor: "#4c688f"
  },
  work: {
    backgroundColor: "#ffff"
  },
  other: {
    backgroundColor: "#F3EEC3"
  },
  formTextLabel: {
    fontSize: "1.5rem",
    color: "#4c688f"
  },
  formTextInput: {
    fontSize: "1.5rem"
  }
});

const MessageModal = ({ open, handleClose, date, classes }) => {
  const [type, setType] = useState("");
  const [recipient, setRecipient] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setText] = useState("");
  const [newDate, setNewDate] = useState(moment(date).format("YYYY-MM-DD"));
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    setNewDate(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  return (
    <div>
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
          <span className={classes.title}>Schedule a new message</span>
        </DialogTitle>
        <DialogContent>
          <BtnGroup>
            <TypeBtn className={classes.family} onClick={() => setType("family")} clicked={type === "family"}>
              <i className='fas fa-home' /> Family
            </TypeBtn>
            <TypeBtn className={classes.friend} onClick={() => setType("friend")} clicked={type === "friend"}>
              <i className='fas fa-user-friends' /> Friend
            </TypeBtn>
            <TypeBtn className={classes.work} onClick={() => setType("work")} clicked={type === "work"}>
              <i className='fas fa-briefcase' /> Work
            </TypeBtn>
            <TypeBtn className={classes.other} onClick={() => setType("other")} clicked={type === "other"}>
              <i className='fas fa-envelope' /> Other
            </TypeBtn>
          </BtnGroup>
          <InputGroup>
            <TextField
              required
              autoFocus
              fullWidth
              margin='dense'
              label='Name of Recipient'
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
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
            <TextField
              required
              autoFocus
              fullWidth
              margin='dense'
              type='email'
              label='Email of Recipient'
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
              FormHelperTextProps={{
                classes: {
                  error: classes.errors
                }
              }}
              classes={{ root: classes.textField }}
            />
            <TextField
              required
              autoFocus
              fullWidth
              margin='dense'
              label='Message'
              multiline
              value={messageText}
              onChange={e => setText(e.target.value)}
              inputProps={{
                name: "message",
                style: { fontSize: "1.6rem", padding: "5px 0" }
              }}
              InputLabelProps={{
                style: {
                  fontSize: "1.4rem",
                  color: "#4c688f",
                  marginBottom: 10
                }
              }}
              classes={{ root: classes.textAreaField }}
            />
            <TextField
              required
              autoFocus
              fullWidth
              margin='dense'
              type='date'
              label='Date'
              value={moment(newDate).format("YYYY-MM-DD")}
              onChange={e => setNewDate(moment(e.target.value).format("YYYY-MM-DD"))}
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
            <TextField
              required
              autoFocus
              fullWidth
              margin='dense'
              type='time'
              label='Time'
              value={time}
              onChange={e => setTime(e.target.value)}
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
          </InputGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Schedule</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(MessageModal);
