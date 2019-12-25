import React, { useState } from "react";
import * as moment from "moment";
import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";

import loveImage from "../../assets/images/love.jpg";
import getWellImage from "../../assets/images/getWell.jpg";
import birthdayImage from "../../assets/images/birthday.jpg";
import messageImage from "../../assets/images/message.jpg";
import thankImage from "../../assets/images/thankYou.jpg";
import TopNav from "../navbar/TopNav";
import { NewMessageContainer, BtnGroup, InputGroup, MessageType, Type, TypeLabel } from "../../styles/messagesStyles";
import { Button } from "../../styles/commonStyles";

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

const NewMessage = ({ classes }) => {
  const [type, setType] = useState("other");
  const [recipientName, setRecipient] = useState("");
  const [recipientEmail, setEmail] = useState("");
  const [messageText, setText] = useState("");
  const [newDate, setNewDate] = useState(moment(Date.now()).format("YYYY-MM-DD"));
  const [time, setTime] = useState("00:00");
  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");

  // useEffect(() => {
  //   setNewDate(moment(date).format("YYYY-MM-DD"));
  // }, [date]);

  // useEffect(() => {
  //   if (message) {
  //     setType(message.type);
  //     setRecipient(message.recipientName);
  //     setEmail(message.recipientEmail);
  //     setText(message.messageText);
  //     setNewDate(moment(message.date).format("YYYY-MM-DD"));
  //     setTime(moment(message.date).format("HH:mm"));
  //   }
  // }, [message]);

  //     const handleSchedule = () => {
  //       const year = moment(date).format("YYYY");
  //       const month = moment(date).format("MM");
  //       const day = moment(date).format("DD");
  //       const [hour, minutes] = time.split(":");
  //       // const messageDate = new Date(newDate + " " + time);
  //       const messageDate = new Date(year, Number(month) - 1, day, hour, minutes);
  //       const newMessage = { type, recipientName, recipientEmail, messageText, date: messageDate };
  //       if (!recipientName.trim()) {
  //         setError("recipient");
  //         setErrorText("Please enter the name of the recipient of your message.");
  //       } else if (!recipientEmail) {
  //         setError("email");
  //         setErrorText("Please enter the email of the recipient of your message.");
  //       } else if (!messageText.trim()) {
  //         setError("text");
  //         setErrorText("Please enter a valid message.");
  //       } else if (messageDate.getTime() < new Date().getTime()) {
  //         setError("date");
  //         setErrorText("Please enter a valid date in the future.");
  //       } else {
  //         setError("");
  //         setErrorText("");
  //         handleSubmit(newMessage);
  //         handleCancel();
  //       }
  //     };

  //     const handleCancel = () => {
  //     setError("");
  //     setErrorText("");
  //     setRecipient("");
  //     setEmail("");
  //     setText("");
  //     setType("other");
  //     setNewDate(moment(date).format("YYYY-MM-DD"));
  //     setTime("00:00");
  //     handleClose();
  //   };

  return (
    <>
      <TopNav />
      <NewMessageContainer>
        <BtnGroup>
          <Type>
            <MessageType
              src={loveImage}
              alt='Love Message'
              onClick={() => setType("love")}
              clicked={type === "love"}
            ></MessageType>
            <TypeLabel>Love</TypeLabel>
          </Type>
          <Type>
            <MessageType
              src={birthdayImage}
              alt='Birthday Message'
              onClick={() => setType("birthday")}
              clicked={type === "birthday"}
            ></MessageType>
            <TypeLabel>Birthday</TypeLabel>
          </Type>
          <Type>
            <MessageType
              src={getWellImage}
              alt='Get Well Message'
              onClick={() => setType("getWell")}
              clicked={type === "getWell"}
            ></MessageType>
            <TypeLabel>Get Well</TypeLabel>
          </Type>
          <Type>
            <MessageType
              src={messageImage}
              alt='Message'
              onClick={() => setType("other")}
              clicked={type === "other"}
            ></MessageType>
            <TypeLabel>General</TypeLabel>
          </Type>
          <Type>
            <MessageType
              src={thankImage}
              alt='Thank You Message'
              onClick={() => setType("thank")}
              clicked={type === "thank"}
            ></MessageType>
            <TypeLabel>Thank You</TypeLabel>
          </Type>
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
      </NewMessageContainer>
    </>
  );
};

export default withStyles(styles)(NewMessage);
