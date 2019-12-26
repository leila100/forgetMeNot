import React from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { MessageBox, MessageType, MessageBody, MessageIcon, Info } from "../../styles/messagesStyles";

const Message = ({ message, row, setUpdate, deleteMessage, history }) => {
  return (
    <MessageBox
      row={row}
      onClick={() => {
        setUpdate(message);
        history.push("/");
      }}
    >
      <MessageType type={message.type} />
      <MessageBody sent={message.sent} row={row}>
        <Info row={row}>
          <span>To:</span> {message.recipientName} ({message.recipientEmail})
        </Info>
        <p>{message.messageText}</p>
        <Info row={row}>{moment(message.date).format("hh:mm a")}</Info>
        <MessageIcon
          id='delete'
          onClick={e => {
            e.stopPropagation();
            return deleteMessage(message.id);
          }}
        >
          <i className='far fa-trash-alt' />
        </MessageIcon>
      </MessageBody>
    </MessageBox>
  );
};

export default withRouter(Message);
