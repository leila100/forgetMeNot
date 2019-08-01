import styled from "styled-components";

export const messageBgColor = "#284243";

export const Messages = styled.ul`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: space-around;
  width: 100%;
`;

export const MessageBox = styled.li`
  display: flex;
  margin: 10px 0;
`;

export const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${messageBgColor};
  color: white;
  width: 100%;
  padding: 5px;
  div {
    margin: 5px 0;
  }
  span {
    color: #f3eec3;
  }
`;

export const MessageType = styled.div`
  width: 5%;
  background-color: ${props =>
    props.type === "family"
      ? "#b87a71"
      : props.type === "friend"
      ? "#4c688f"
      : props.type === "work"
      ? "#666680"
      : "#F3EEC3"};
`;

export const Date = styled.div`
  font-size: 1.6rem;
  color: ${props => (props.color ? "#4C688F" : "#F3EEC3")};
`;
