import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import requireAuth from "../../hoc/requireAuth";
import TopNavBar from "../navbar/TopNav";
import { fetchMessages, deleteMessage, saveCurrentMessage } from "../../store/actions/index";

import { CalendarPage, Cal, WeekCal, Day } from "../../styles/calendarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";

const styles = (theme) => ({
  root: {
    fontSize: "1.7rem",
  },
});

const Calendar = ({ history, classes }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messagesReducer);

  const [date, setDate] = useState(Date.now());
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);

  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setEvents(
      messages.map((message) => {
        return {
          start: message.date,
          end: message.date,
        };
      })
    );
  }, [messages]);

  const pickDate = (arg) => {
    const datePicked = arg.date;
    setDate(datePicked);
  };

  const deleteMessageHandler = () => {
    deleteMessage(id)(dispatch);
    handleClose();
  };

  const handleSetUpdate = (message) => {
    saveCurrentMessage(message)(dispatch);
  };

  const handleNewMessage = () => {
    const message = {
      date: moment(new Date(date)).format("YYYY-MM-DD"),
    };
    handleSetUpdate(message);
    history.push("/");
  };

  const handleClickOpen = (messageId) => {
    setOpen(true);
    setId(messageId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dates = [date];
  return (
    <>
      <TopNavBar />
      <CalendarPage>
        <Cal>
          <FullCalendar
            defaultView='dayGridMonth'
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            dateClick={pickDate}
            selectable='true'
            handleWindowResize='true'
            eventSources={[
              {
                events: events,
                color: "#4c688f",
                textColor: "white",
              },
            ]}
          />
        </Cal>
        <WeekCal>
          <FullCalendar
            defaultView='dayGridWeek'
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            dateClick={pickDate}
            selectable='true'
            height='auto'
            handleWindowResize='true'
            eventSources={[
              {
                events: events,
                color: "#4c688f",
                textColor: "white",
              },
            ]}
          />
        </WeekCal>
        <Day>
          <Button onClick={handleNewMessage}>Schedule a message</Button>
          <MessagesList dates={dates} row deleteMessage={handleClickOpen} setUpdate={handleSetUpdate} />
        </Day>
      </CalendarPage>
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

export default withStyles(styles)(requireAuth(Calendar));
