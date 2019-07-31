import React from "react";

import { MessageBox, MessageType, MessageBody } from "../../styles/messagesStyles";

const Message = ({ message }) => {
  return (
    <MessageBox>
      <MessageType type={message.type} />
      <MessageBody>
        <div>Recipient: {message.recipient}</div>
        <div>Email: {message.email}</div>
        <div>
          <p>Message: {message.message}</p>
        </div>
        <div>Time: {message.time}</div>
      </MessageBody>
    </MessageBox>
  );
};

export default Message;
