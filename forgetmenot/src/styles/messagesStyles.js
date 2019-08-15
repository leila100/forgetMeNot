import styled from "styled-components";
import { flexRow } from "./commonStyles";

export const messageBgColor = "#284243";

export const Messages = styled.ul`
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export const MessageBox = styled.li`
  display: flex;
  margin: 10px 0;
  width: ${props => (props.row ? "95%" : "100%")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

export const Info = styled.div`
  margin: 5px;
  ${props => props.row && `width: 100%; margin-left: 10px; text-align: start;`}
`;

export const MessageBody = styled.div`
  display: flex;
  flex-direction: ${props => (props.row === true ? "row" : "column")};
  justify-content: space-between;
  align-items: ${props => props.row && "center"};
  background-color: ${messageBgColor};
  opacity: ${props => (props.sent ? "0.4" : "1")};
  color: white;
  width: 95%;
  padding: 5px;
  p {
    line-height: 1.5;
    overflow-wrap: break-word;
    margin: 5px;
    ${props =>
      props.row && `text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 50%; padding-left: 10px`}
  }
  span {
    color: #f3eec3;
    ${props => props.row && `display: none;`}
  }
`;

export const MessageType = styled.div`
  width: 4%;
  background-color: ${props =>
    props.type === "family"
      ? "#b87a71"
      : props.type === "friend"
      ? "#4c688f"
      : props.type === "work"
      ? "#ffff"
      : "#F3EEC3"};
`;

export const Date = styled.div`
  font-size: 1.6rem;
  color: ${props => (props.textColor ? "#4C688F" : "#F3EEC3")};
`;

export const IconGroup = styled(flexRow)`
  justify-content: space-between;
  #delete {
    cursor: pointer;
    :hover {
      i {
        background-color: red;
      }
    }
  }
`;

export const MessageIcon = styled.div`
  text-align: right;
  i {
    border-radius: 50%;
    color: #284243;
    padding: 10px;
    font-size: 1.8rem;
    background-color: ${props =>
      props.type === "family"
        ? "#b87a71"
        : props.type === "friend"
        ? "#4c688f"
        : props.type === "work"
        ? "#ffff"
        : "#F3EEC3"};
  }
`;

export const MessagesContainer = styled.div`
  margin-top: 50px;
  padding: 10px;
  width: 100%;
`;
