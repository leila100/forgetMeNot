import styled from "styled-components";

import { flexRow } from "./commonStyles";

export const CalendarPage = styled(flexRow)`
  width: 95%;
  /* max-width: 1200px; */
  margin: 20px auto;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const CalendarWrapper = styled(flexRow)`
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Cal = styled.div`
  width: 50%;
  margin: auto;
  background-color: white;
  a {
    margin-bottom: 10px;
  }
  @media (max-width: 960px) {
    display: none;
  }
`;

export const WeekCal = styled(Cal)`
  display: none;
  .fc-content-skeleton {
    height: 50px;
  }
  .fc-left {
    font-size: 1.2rem;
  }
  .fc-right {
    width: 60%;
  }
  @media (max-width: 960px) {
    display: block;
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
  }
`;

export const Day = styled.div`
  padding: 0 10px;
  text-align: center;
  width: 95%;
  background-color: #d7d7d7;
  ul {
    text-align: left;
  }
  @media (max-width: 960px) {
    width: 100%;
    padding: 0;
  }
`;
