import React, { useState, useEffect } from "react";
import * as moment from "moment";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, getCurrentUser, updateMessage } from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";

import loveImage from "../../assets/images/love.jpg";
import getWellImage from "../../assets/images/getWell.jpg";
import birthdayImage from "../../assets/images/birthday.jpg";
import messageImage from "../../assets/images/message.jpg";
import thankImage from "../../assets/images/thankYou.jpg";
import TopNav from "../navbar/TopNav";
import {
  NewMessageContainer,
  BtnGroup,
  InputGroup,
  MessageType,
  Type,
  TypeLabel,
  MessageContainer,
  Preview
} from "../../styles/messagesStyles";
import { Button, Error } from "../../styles/commonStyles";

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
  textAreaField: {
    paddingRight: 20,
    marginTop: 20,
    fontSize: "1.6rem"
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

const NewMessage = ({ classes, history }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.usersReducer).currentUser;
  const savedMessage = useSelector(state => state.messagesReducer).currentMessage;
  const [type, setType] = useState("general");
  const [recipientName, setRecipient] = useState("");
  const [recipientEmail, setEmail] = useState("");
  const [messageText, setText] = useState("");
  const [newDate, setNewDate] = useState(moment(Date.now()).format("YYYY-MM-DD"));
  const [time, setTime] = useState("00:00");
  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (savedMessage.date) {
      setNewDate(moment(savedMessage.date).format("YYYY-MM-DD"));
      setTime(moment(savedMessage.date).format("HH:mm"));
    }
    if (savedMessage.type) {
      console.log("here");
      setType(savedMessage.type);
      setRecipient(savedMessage.recipientName);
      setEmail(savedMessage.recipientEmail);
      setText(savedMessage.messageText);
      setNewDate(moment(savedMessage.date).format("YYYY-MM-DD"));
      setTime(moment(savedMessage.date).format("HH:mm"));
      if (savedMessage.sent) {
        setErrorText("This message was already sent!");
        setError("update");
        setUpdate(false);
      } else setUpdate(true);
    }
  }, [savedMessage]);

  const handleSchedule = () => {
    const token = localStorage.getItem("jwt");
    if (!token) history.push("/login");
    if (!user && token) getCurrentUser()(dispatch);
    const year = moment(newDate).format("YYYY");
    const month = moment(newDate).format("MM");
    const day = moment(newDate).format("DD");
    const [hour, minutes] = time.split(":");
    const messageDate = new Date(year, Number(month) - 1, day, hour, minutes);
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
      if (update) updateMessage(savedMessage.id, newMessage)(dispatch);
      else addMessage(newMessage)(dispatch);
      handleReset();
      history.push("/messages");
    }
  };

  const handleReset = () => {
    setError("");
    setErrorText("");
    setRecipient("");
    setEmail("");
    setText("");
    setType("other");
    setNewDate(moment(newDate).format("YYYY-MM-DD"));
    setTime("00:00");
    setUpdate(false);
  };

  var imgSource = messageImage;
  if (type === "love") imgSource = loveImage;
  else if (type === "birthday") imgSource = birthdayImage;
  else if (type === "getWell") imgSource = getWellImage;
  else if (type === "thank") imgSource = thankImage;

  return (
    <>
      <TopNav />
      <NewMessageContainer>
        <BtnGroup>
          <Type>
            <MessageType
              type='love'
              alt='Love Message'
              onClick={() => setType("love")}
              clicked={type === "love"}
            ></MessageType>
            <TypeLabel>Love</TypeLabel>
          </Type>
          <Type>
            <MessageType
              type='birthday'
              alt='Birthday Message'
              onClick={() => setType("birthday")}
              clicked={type === "birthday"}
            ></MessageType>
            <TypeLabel>Birthday</TypeLabel>
          </Type>
          <Type>
            <MessageType
              type='getWell'
              alt='Get Well Message'
              onClick={() => setType("getWell")}
              clicked={type === "getWell"}
            ></MessageType>
            <TypeLabel>Get Well</TypeLabel>
          </Type>
          <Type>
            <MessageType
              type='message'
              alt='Message'
              onClick={() => setType("other")}
              clicked={type === "other"}
            ></MessageType>
            <TypeLabel>General</TypeLabel>
          </Type>
          <Type>
            <MessageType
              type='thank'
              alt='Thank You Message'
              onClick={() => setType("thank")}
              clicked={type === "thank"}
            ></MessageType>
            <TypeLabel>Thank You</TypeLabel>
          </Type>
        </BtnGroup>
        {error === "update" && errorText && <Error>{errorText}</Error>}
        <MessageContainer>
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
            <Button onClick={handleSchedule}>Schedule</Button>
          </InputGroup>
          <Preview>
            <img src={imgSource} alt={`Theme ${type}`} />
            <div>
              <div>To: {recipientName}</div>
              {user && <div>From: {user.username}</div>}
              <p>{messageText}</p>
            </div>
          </Preview>
        </MessageContainer>
      </NewMessageContainer>
    </>
  );
};

export default withStyles(styles)(NewMessage);
