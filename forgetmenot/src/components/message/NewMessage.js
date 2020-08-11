import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as moment from "moment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { addMessage, getCurrentUser, updateMessage, addContact, getContacts } from "../../store/actions/index";
import { typeImages } from "../../utils/typeImages";

import {
  NewMessageContainer,
  BtnGroup,
  InputGroup,
  MessageType,
  Type,
  TypeLabel,
  MessageContainer,
  Preview,
} from "../../styles/messagesStyles";
import { Button, Error, Instructions } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  textField: {
    paddingRight: 20,
    marginTop: 20,
    fontSize: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  textAreaField: {
    paddingRight: 20,
    marginTop: 20,
    fontSize: "1.6rem",
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
  select: {
    fontSize: "1.3rem",
  },
  selectText: {
    paddingRight: 20,
    width: "276px",
    fontSize: "1.4rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const NewMessage = ({ history, currentMessage }) => {
  console.log("current message: ", currentMessage);
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.usersReducer).currentUser;
  const contacts = useSelector((state) => state.contactsReducer).contacts;
  const savedMessage = useSelector((state) => state.messagesReducer).currentMessage;

  // State variables for form information
  const [type, setType] = useState("other");
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

  useEffect(() => {
    if (contacts.length === 0) getContacts()(dispatch);
  }, []);

  const checkContact = (email) => {
    const exist = contacts.find((contact) => contact.contactEmail === email);
    if (exist) return true;
    return false;
  };

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
      else {
        addMessage(newMessage)(dispatch);
      }
      // check if recipient in contacts
      if (!checkContact(newMessage.recipientEmail))
        addContact({ contactName: newMessage.recipientName, contactEmail: newMessage.recipientEmail })(dispatch);
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

  const options = contacts.map((option) => {
    const firstLetter = option.contactName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  return (
    <>
      <Instructions>
        <p>Select a category.</p>
        <p>Fill up the form and hit Schedule.</p>
        <p>Your message will be scheduled to be sent on the exact day and time.</p>
      </Instructions>
      <NewMessageContainer>
        <BtnGroup>
          {Object.keys(typeImages).map((imageType) => (
            <Type key={imageType}>
              <MessageType
                type={imageType}
                imageUrl={typeImages[imageType]}
                alt={`Image for type ${imageType}`}
                onClick={() => setType(imageType)}
                clicked={type === imageType}
              ></MessageType>
              <TypeLabel>Love</TypeLabel>
            </Type>
          ))}
        </BtnGroup>
        {error === "update" && errorText && <Error>{errorText}</Error>}
        <MessageContainer>
          <InputGroup>
            <Autocomplete
              id='contacts'
              options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.contactName}
              style={{ width: "95%" }}
              onChange={(e, val) => {
                if (val && val.contactName) {
                  setRecipient(val.contactName);
                  setEmail(val.contactEmail);
                } else if (!val) {
                  setRecipient("");
                  setEmail("");
                }
              }}
              inputValue={recipientName}
              noOptionsText='No previous contacts'
              classes={{ input: classes.selectText, option: classes.select }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Contacts'
                  margin='normal'
                  variant='outlined'
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.formTextLabel,
                    },
                  }}
                />
              )}
            />
            <TextField
              required
              error={error === "recipient"}
              helperText={error === "recipient" ? errorText : ""}
              // autoFocus
              fullWidth
              margin='dense'
              label='Name of Recipient'
              value={recipientName}
              onChange={(e) => setRecipient(e.target.value)}
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
            <TextField
              required
              error={error === "email"}
              helperText={error === "email" ? errorText : ""}
              fullWidth
              margin='dense'
              type='email'
              label='Email of Recipient'
              value={recipientEmail}
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
              FormHelperTextProps={{
                classes: {
                  error: classes.errors,
                },
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
              onChange={(e) => setText(e.target.value)}
              inputProps={{
                name: "message",
                style: { fontSize: "1.6rem", padding: "5px 0", height: "80px", lineHeight: "1.5" },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "1.4rem",
                  color: "#4c688f",
                  marginBottom: 10,
                },
              }}
              FormHelperTextProps={{
                classes: {
                  error: classes.errors,
                },
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
              onChange={(e) => setNewDate(moment(e.target.value).format("YYYY-MM-DD"))}
              InputLabelProps={{
                classes: {
                  root: classes.formTextLabel,
                },
              }}
              InputProps={{
                classes: {
                  input: classes.formTextInput,
                },
                min: moment(Date.now()).format("YYYY-MM-DD"),
              }}
              FormHelperTextProps={{
                classes: {
                  error: classes.errors,
                },
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
              onChange={(e) => setTime(e.target.value)}
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
            <Button onClick={handleSchedule}>Schedule</Button>
          </InputGroup>
          <Preview>
            <img src={typeImages[type]} alt={`Theme ${type}`} />
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

export default NewMessage;
