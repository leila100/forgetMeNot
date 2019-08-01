import styled from "styled-components";

export const CalendarPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 10px;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  justify-content: space-between;
  align-content: center;
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
