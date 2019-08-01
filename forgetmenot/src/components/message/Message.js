import React from "react";

import { MessageBox, MessageType, MessageBody } from "../../styles/messagesStyles";

const Message = ({ message }) => {
  return (
    <MessageBox>
      <MessageType type={message.type} />
      <MessageBody>
        <div>
          <span>Recipient:</span> {message.recipient}
        </div>
        <div>
          <span>Email:</span> {message.email}
        </div>
        <div>
          <p>
            <span>Message:</span> {message.message}
          </p>
        </div>
        <div>
          <span>Time:</span> {message.time}
        </div>
      </MessageBody>
    </MessageBox>
  );
};

export default Message;
