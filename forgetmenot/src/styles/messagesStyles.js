import styled from "styled-components";
import { flexRow, Container } from "./commonStyles";

import loveImage from "../assets/images/love.jpg";
import getWellImage from "../assets/images/getWell.jpg";
import birthdayImage from "../assets/images/birthday.jpg";
import messageImage from "../assets/images/message.jpg";
import thankImage from "../assets/images/thankYou.jpg";

export const messageBgColor = "#284243";

export const NewMessageContainer = styled(flexRow)`
  max-width: 800px;
  margin: 20px auto;
  flex-direction: column;
`;

export const MessageContainer = styled(Container)`
  width: 100%;
  padding: 10px;
  align-content: start;
`;

export const Preview = styled.div`
  margin-left: 10px;
  border-left: 1px solid black;
  padding: 5px;
  width: 100%;
  p {
    margin-top: 20px;
    font-size: 2.2rem;
    font-family: Indie Flower;
  }
  img {
    margin-bottom: 10px;
    width: 100%;
    height: 225px;
  }
  div {
    margin: 10px 0;
  }
  @media (max-width: 450px) {
    display: none;
  }
`;

export const Type = styled(flexRow)`
  flex-direction: column;
  margin: 5px 1%;
`;

export const MessageType = styled.img`
  width: 125px;
  height: 125px;
  background-size: 100% 100%;
  border: ${(props) => props.clicked && "6px solid #2196f3"};
  content: url(${(props) =>
    props.type === "love"
      ? loveImage
      : props.type === "birthday"
      ? birthdayImage
      : props.type === "getWell"
      ? getWellImage
      : props.type === "thank"
      ? thankImage
      : messageImage});
  cursor: pointer;
  @media (max-width: 700px) {
    width: 100px;
    height: 100px;
    margin: 5px;
  }
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
  @media (max-width: 500px) {
    width: 70px;
    height: 70px;
    margin: 0;
  }
`;

export const TypeLabel = styled.div`
  font-size: 1.7rem;
  text-align: center;
  margin-top: 5px;
`;

export const BtnGroup = styled(flexRow)`
  flex-wrap: wrap;
  margin-bottom: 10px;
  button {
    width: 120px;
    border-radius: 20px;
    color: #132021;
    background-color: ${(props) => props.clicked && "#284243"};
    i {
      margin-right: 5px;
    }
  }
`;

export const InputGroup = styled(flexRow)`
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const Messages = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export const MessageBox = styled.li`
  display: flex;
  margin: 10px 0;
  width: ${(props) => (props.row ? "95%" : "100%")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  img {
    width: 50px;
    height: 100%;
  }
`;

export const Info = styled.div`
  margin-left: 10px;
  text-align: start;
  width: 25%;
`;

export const MessageBody = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row === true ? "row" : "column")};
  justify-content: space-between;
  align-items: ${(props) => props.row && "center"};
  :hover {
    background-color: #4c74ab;
    color: white;
  }
  opacity: ${(props) => (props.sent ? "0.4" : "1")};
  width: 95%;
  padding: 5px;
  p {
    line-height: 1.5;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 50%;
    padding-left: 10px;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export const DateFormat = styled.div`
  font-size: 1.6rem;
  color: ${(props) => (props.textColor ? "#4C688F" : "#F3EEC3")};
`;

export const IconGroup = styled(flexRow)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
    color: red;
    padding: 10px;
    font-size: 1.8rem;
    :hover {
      background-color: #b87a71;
    }
  }
`;

export const MessagesContainer = styled.div`
  margin-top: 50px;
  padding: 10px;
  width: 100%;
`;
