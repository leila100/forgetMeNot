import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import "@fullcalendar/core/main.css";

import FMN from "../../assets/images/FMN1.png";
import { Header } from "../../styles/commonStyles";
import { CalendarPage, CalendarWrapper, Cal } from "../../styles/calendarStyles";
import MessagesList from "../message/MessagesList";

const Calendar = () => {
  const pickDate = arg => {
    const date = arg.date;
    console.log({ date });
  };

  const dates = ["07/31/2019"];
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
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={pickDate}
            selectable='true'
            handleWindowResize='true'
            events={{ title: "Event Now", start: new Date() }}
          />
        </Cal>
        <MessagesList dates={dates} />
      </CalendarWrapper>
    </CalendarPage>
  );
};

export default Calendar;
