import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";

import FMN from "../../assets/images/FMN1.png";
import { Header } from "../../styles/commonStyles";
import { CalendarPage, CalendarWrapper, Cal } from "../../styles/calendarStyles";
import MessagesList from "../message/MessagesList";

const Calendar = () => {
  const [date, setDate] = useState(Date.now());

  const pickDate = arg => {
    const datePicked = arg.date;
    setDate(datePicked);
  };

  const dates = [date];
  return (
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
            events={[
              { start: new Date() },
              { start: new Date("07/31/2019 10:00") },
              { start: new Date("07/31/2019 14:00") }
            ]}
          />
        </Cal>
        <MessagesList dates={dates} />
      </CalendarWrapper>
    </CalendarPage>
  );
};

export default Calendar;
