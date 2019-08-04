import React from "react";

import { MessageBox, MessageType, MessageBody, MessageIcon } from "../../styles/messagesStyles";

const Message = ({ message, row }) => {
  return (
    <MessageBox row={row}>
      <MessageType type={message.type} />
      <MessageBody>
        <MessageIcon type={message.type}>
          {message.type === "friend" ? (
            <i className='fas fa-user-friends' />
          ) : (
            <>
              {message.type === "family" ? (
                <i className='fas fa-home' />
              ) : (
                <>{message.type === "work" ? <i className='fas fa-briefcase' /> : <i className='fas fa-envelope' />}</>
              )}
            </>
          )}
        </MessageIcon>
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
