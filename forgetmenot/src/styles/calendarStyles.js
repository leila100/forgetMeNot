import styled from "styled-components";

import { flexRow } from "./commonStyles";

export const CalendarPage = styled(flexRow)`
  width: 95%;
  max-width: 1200px;
  margin: 20px auto;
  @media (max-width: 800px) {
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
  width: 95%;
  margin: auto;
  background-color: white;
  a {
    margin-bottom: 10px;
  }
  @media (max-width: 550px) {
    display: none;
  }
`;

export const WeekCal = styled(Cal)`
  display: none;
  @media (max-width: 550px) {
    display: block;
  }
`;

export const Day = styled.div`
  padding-left: 20px;
  text-align: center;
  width: 95%;
  background-color: #d7d7d7;
  ul {
    text-align: left;
  }
`;
