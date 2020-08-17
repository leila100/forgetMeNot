import styled from "styled-components";
import { flexRow, Container } from "./commonStyles";

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
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 45px;
  }
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
    word-break: break-word;
  }
  img {
    margin-bottom: 10px;
    width: 100%;
    height: 225px;
  }
  div {
    margin: 10px 0;
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
  content: url(${(props) => props.imageUrl});
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

export const MessageIcon = styled.div`
  text-align: right;
  i {
    border-radius: 50%;
    color: red;
    font-size: 1.5rem;
    :hover {
      background-color: #b87a71;
    }
  }
`;
