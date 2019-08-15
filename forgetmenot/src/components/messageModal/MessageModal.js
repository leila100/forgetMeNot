import React, { useState, useEffect } from "react";
import * as moment from "moment";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Button } from "../../styles/commonStyles";
import { BtnGroup, TypeBtn, InputGroup } from "../../styles/modalStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    backgroundColor: "#284243"
  },
  dialogContent: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0
    }
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
    width: "276px",
    marginTop: 20,
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  textAreaField: {
    paddingRight: 20,
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
  },
  errors: {
    fontSize: "1.5rem"
  }
});

const MessageModal = ({ open, handleClose, date, handleSubmit, message, classes }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [type, setType] = useState("other");
  const [recipientName, setRecipient] = useState("");
  const [recipientEmail, setEmail] = useState("");
  const [messageText, setText] = useState("");
  const [newDate, setNewDate] = useState(moment(date).format("YYYY-MM-DD"));
  const [time, setTime] = useState("00:00");
  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setNewDate(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  useEffect(() => {
    if (message) {
      setType(message.type);
      setRecipient(message.recipientName);
      setEmail(message.recipientEmail);
      setText(message.messageText);
      setNewDate(moment(message.date).format("YYYY-MM-DD"));
      setTime(moment(message.date).format("HH:mm"));
    }
  }, [message]);

  const handleSchedule = () => {
    const messageDate = new Date(newDate + " " + time);
    const newMessage = { type, recipientName, recipientEmail, messageText, date: messageDate };
    if (!recipientName.trim()) {
      setError("recipient");
      setErrorText("Please enter the name of the recipient of your message.");
    } else if (!recipientEmail) {
      setError("email");
      setErrorText("Please enter the email of the recipient of your message.");
    } else if (!messageText.trim()) {
      setError("text");
      setErrorText("Please enter a valid message.");
    } else if (messageDate.getTime() < new Date().getTime()) {
      setError("date");
      setErrorText("Please enter a valid date in the future.");
    } else {
      setError("");
      setErrorText("");
      handleSubmit(newMessage);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setError("");
    setErrorText("");
    setRecipient("");
    setEmail("");
    setText("");
    setType("other");
    setNewDate(moment(date).format("YYYY-MM-DD"));
    setTime("00:00");
    handleClose();
  };
  return (
    <div>
      <Dialog
        classes={{ root: classes.root }}
        fullScreen={fullScreen}
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        TransitionComponent={Transition}
      >
        <DialogTitle id='form-dialog-title'>
          <span className={classes.title}>{message ? "Update Message" : "Schedule a new message"}</span>
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContent }}>
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
              error={error === "recipient"}
              helperText={error === "recipient" ? errorText : ""}
              autoFocus
              fullWidth
              margin='dense'
              label='Name of Recipient'
              value={recipientName}
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
              error={error === "email"}
              helperText={error === "email" ? errorText : ""}
              fullWidth
              margin='dense'
              type='email'
              label='Email of Recipient'
              value={recipientEmail}
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
              error={error === "text"}
              helperText={error === "text" ? errorText : ""}
              fullWidth
              margin='dense'
              label='Message'
              multiline
              value={messageText}
              onChange={e => setText(e.target.value)}
              inputProps={{
                name: "message",
                style: { fontSize: "1.6rem", padding: "5px 0", height: "80px", lineHeight: "1.5" }
              }}
              InputLabelProps={{
                style: {
                  fontSize: "1.4rem",
                  color: "#4c688f",
                  marginBottom: 10
                }
              }}
              FormHelperTextProps={{
                classes: {
                  error: classes.errors
                }
              }}
              classes={{ root: classes.textAreaField }}
            />
            <TextField
              required
              fullWidth
              error={error === "date"}
              helperText={error === "date" ? errorText : ""}
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
                },
                min: moment(Date.now()).format("YYYY-MM-DD")
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
              fullWidth
              error={error === "date"}
              helperText={error === "date" ? errorText : ""}
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSchedule}>{message ? "Update" : "Schedule"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(MessageModal);
