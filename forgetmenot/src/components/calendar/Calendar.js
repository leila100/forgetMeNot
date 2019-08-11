import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";

import FMN from "../../assets/images/FMN1.png";
import { Header } from "../../styles/commonStyles";
import { CalendarPage, CalendarWrapper, Cal, Day } from "../../styles/calendarStyles";
import { Button } from "../../styles/commonStyles";
import MessagesList from "../message/MessagesList";
import MessageModal from "../messageModal/MessageModal";
import RightBar from "../navbar/RightBar";

const Calendar = ({ addMessage, updateMessage, deleteMessage }) => {
  const { messages } = useSelector(state => state.messagesReducer);

  const [date, setDate] = useState(Date.now());
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(
      messages.map(message => {
        return { start: message.date };
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
      <CalendarPage>
        <Header>
          <img src={FMN} alt='Forget Me Not Flower' />
          <div>
            <h1>Welcome to Forget Me Not</h1>
            <h2>See all your messages.</h2>
            <h2>Create new ones.</h2>
          </div>
        </Header>
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
          <Day>
            <Button onClick={handleClickOpen}>Schedule a message</Button>
            <MessagesList dates={dates} row updateMessage={updateMessage} deleteMessage={deleteMessage} />
          </Day>
        </CalendarWrapper>
        <MessageModal open={open} handleClose={handleClose} date={date} handleSubmit={handleAdd} />
      </CalendarPage>
      <RightBar updateMessage={updateMessage} deleteMessage={deleteMessage} />
    </>
  );
};

export default Calendar;
