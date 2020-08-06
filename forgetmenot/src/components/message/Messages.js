import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles } from "@material-ui/core/styles";

import requireAuth from "../../hoc/requireAuth";
import TopNavBar from "../navbar/TopNav";
import { fetchMessages, deleteMessage, saveCurrentMessage } from "../../store/actions/index";
import { Container, Button } from "../../styles/commonStyles";
import { MessagesContainer } from "../../styles/messagesStyles";
import MessagesList from "../message/MessagesList";

const styles = (theme) => ({
  root: {
    fontSize: "1.6rem",
  },
  cancel: {
    fontSize: "1.6rem",
    color: "#4c688f",
  },
  delete: {
    fontSize: "1.6rem",
    color: "red",
  },
});

const Messages = ({ classes, messages: msg }) => {
  console.log("***** ", msg);
  const dispatch = useDispatch();
  const { fetching, adding, updating, messages } = useSelector((state) => state.messagesReducer);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  // Store all the dates in a unique array
  const dates = messages.map((message) => message.date);
  const uniqueDates = [];
  const dt = [];

  useEffect(() => {
    if (messages.length === 0) fetchMessages()(dispatch);
  }, []);

  const handleClickOpen = (messageId) => {
    setOpen(true);
    setId(messageId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  dates.forEach((d) => {
    if (dt.indexOf(moment(d).format("YYYY-MM-DD")) === -1) {
      dt.push(moment(d).format("YYYY-MM-DD"));
      uniqueDates.push(d);
    }
  });
  if (uniqueDates.length > 0) {
    uniqueDates.sort((a, b) => {
      if (moment(new Date(a)).isSameOrBefore(new Date(b))) return -1;
      else return 1;
    });
  }

  const deleteMessageHandler = () => {
    deleteMessage(id)(dispatch);
    handleClose();
  };

  const handleSetUpdate = (message) => {
    saveCurrentMessage(message)(dispatch);
  };

  return (
    <>
      <TopNavBar />
      {(fetching || adding || updating) && <CircularProgress />}
      <Container>
        <MessagesContainer>
          <MessagesList dates={uniqueDates} row deleteMessage={handleClickOpen} setUpdate={handleSetUpdate} />
        </MessagesContainer>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description' classes={{ root: classes.root }}>
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteMessageHandler} autoFocus delete>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(requireAuth(Messages));
