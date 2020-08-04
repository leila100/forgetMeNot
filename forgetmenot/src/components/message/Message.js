import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { MessageBox, MessageType, MessageBody, MessageIcon, Info } from "../../styles/messagesStyles";
import { typeImages } from "../../utils/typeImages";

const Message = ({ message, row, setUpdate, deleteMessage, history }) => {
  const {type, sent, recipientName, messageText, date, id} = message
  return (
    <MessageBox
      row={row}
      onClick={() => {
        setUpdate(message);
        history.push("/");
      }}
    >
      <MessageType type={type} imageUrl={typeImages[type]} />
      <MessageBody sent={sent} row={row}>
        <Info>{recipientName}</Info>
        <p>{messageText}</p>
        <Info>{moment(date).format("hh:mm a")}</Info>
        <MessageIcon
          id='delete'
          onClick={e => {
            e.stopPropagation();
            return deleteMessage(id);
          }}
        >
          <i className='far fa-trash-alt' />
        </MessageIcon>
      </MessageBody>
    </MessageBox>
  );
};

export default withRouter(Message);
