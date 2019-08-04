import styled from "styled-components";

import { flexRow, flexColumn } from "./commonStyles";

export const CalendarPage = styled(flexColumn)`
  width: 100%;
  margin: 0 10px;
  justify-content: flex-start;
`;

export const CalendarWrapper = styled(flexColumn)`
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const Cal = styled.div`
  padding-right: 2%;
  background-color: white;
`;

export const Day = styled.div`
  margin-top: 20px;
  text-align: center;
  ul {
    text-align: left;
  }
`;
