import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import "@fullcalendar/core/main.css";

import requireAuth from "../../hoc/requireAuth";
import TopNavBar from "../navbar/TopNav";
import { fetchMessages, deleteMessage, saveCurrentMessage } from "../../store/actions/index";

import { CalendarPage, CalendarWrapper, Cal, WeekCal, Day } from "../../styles/calendarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";

const Calendar = ({ history }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.messagesReducer);

  const [date, setDate] = useState(Date.now());
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

  const pickDate = arg => {
    const datePicked = arg.date;
    setDate(datePicked);
  };

  const deleteMessageHandler = messageId => {
    deleteMessage(messageId)(dispatch);
  };

  const handleSetUpdate = message => {
    saveCurrentMessage(message)(dispatch);
  };

  const handleNewMessage = () => {
    const message = {
      date: moment(date).format("YYYY-MM-DD")
    };
    handleSetUpdate(message);
    history.push("/");
  };

  const dates = [date];
  return (
    <>
      <TopNavBar />
      <CalendarPage>
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
          <Button onClick={handleNewMessage}>Schedule a message</Button>
          <MessagesList dates={dates} row deleteMessage={deleteMessageHandler} setUpdate={handleSetUpdate} />
        </Day>
      </CalendarPage>
    </>
  );
};

export default requireAuth(Calendar);
