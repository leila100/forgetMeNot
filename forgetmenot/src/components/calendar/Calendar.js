import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";

import TopNavBar from "../navbar/TopNav";
import { fetchMessages } from "../../store/actions/index";

import { CalendarPage, CalendarWrapper, Cal, WeekCal, Day } from "../../styles/calendarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";
import MessageModal from "../messageModal/MessageModal";

const Calendar = ({ addMessage, updateMessage, deleteMessage }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.messagesReducer);

  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchMessages()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setEvents(
      messages.map(message => {
        return { start: message.date, end: message.date };
      })
    );
  }, [messages]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const handleAdd = message => {
    // dispatch add message
    addMessage(message);
  };

  const pickDate = arg => {
    const datePicked = arg.date;
    setDate(datePicked);
  };

  const dates = [date];
  return (
    <>
      <TopNavBar />
      <CalendarPage>
        <CalendarWrapper>
          <Cal>
            <FullCalendar
              defaultView='dayGridMonth'
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              dateClick={pickDate}
              selectable='true'
              handleWindowResize='true'
              eventSources={[
                {
                  events: events,
                  color: "#4c688f",
                  textColor: "white"
                }
              ]}
            />
          </Cal>
          <WeekCal>
            <FullCalendar
              defaultView='dayGridWeek'
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              dateClick={pickDate}
              selectable='true'
              height='auto'
              handleWindowResize='true'
              eventSources={[
                {
                  events: events,
                  color: "#4c688f",
                  textColor: "white"
                }
              ]}
            />
          </WeekCal>
          <Day>
            <Button onClick={handleClickOpen}>Schedule a message</Button>
            <MessagesList dates={dates} row updateMessage={updateMessage} deleteMessage={deleteMessage} />
          </Day>
        </CalendarWrapper>
        <MessageModal open={open} handleClose={handleClose} date={date} handleSubmit={handleAdd} />
      </CalendarPage>
    </>
  );
};

export default Calendar;
