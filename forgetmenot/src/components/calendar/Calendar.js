import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import requireAuth from "../../hoc/requireAuth";

import { CalendarPage, Cal, WeekCal, Day } from "../../styles/calendarStyles";
import { Button } from "../../styles/commonStyles";
import Messages from "../message/Messages";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     fontSize: "1.7rem",
//   },
// }));

const Calendar = ({ history, messages, onDelete, onMessageClick, setError }) => {
  // const classes = useStyles();

  const [date, setDate] = useState(Date.now());
  const [filteredMessages, setFilteredMessages] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(
      messages.map((message) => {
        return {
          start: message.date,
          end: message.date,
        };
      })
    );
    const msgs = messages.filter(
      (message) => moment(message.date).format("YYYY-MM-DD") === moment(Date.now()).format("YYYY-MM-DD")
    );
    setFilteredMessages(msgs);
  }, [messages]);

  const pickDate = (arg) => {
    const datePicked = arg.date;
    const msgs = messages.filter(
      (message) => moment(message.date).format("YYYY-MM-DD") === moment(datePicked).format("YYYY-MM-DD")
    );
    setDate(datePicked);
    setFilteredMessages(msgs);
  };

  const handleNewMessage = () => {
    const message = {
      date: moment(new Date(date)).format("YYYY-MM-DD"),
    };
    onMessageClick(message);
    history.push("/");
  };

  return (
    <>
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
          <Messages
            messages={filteredMessages}
            onDelete={onDelete}
            onMessageClick={onMessageClick}
            setError={setError}
            history={history}
          />
        </Day>
      </CalendarPage>
    </>
  );
};

export default requireAuth(Calendar);
