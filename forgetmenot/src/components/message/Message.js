import React from "react";
import moment from "moment";

import { MessageBox, MessageType, MessageBody, MessageIcon, IconGroup } from "../../styles/messagesStyles";

const Message = ({ message, row, handleOpen, deleteMessage }) => {
  return (
    <MessageBox row={row} onClick={() => handleOpen(message)}>
      <MessageType type={message.type} />
      <MessageBody>
        <IconGroup>
          <MessageIcon
            id='delete'
            onClick={e => {
              e.stopPropagation();
              return deleteMessage(message.id);
            }}
          >
            <i className='far fa-trash-alt' />
          </MessageIcon>
          <MessageIcon type={message.type}>
            {message.type === "friend" ? (
              <i className='fas fa-user-friends' />
            ) : (
              <>
                {message.type === "family" ? (
                  <i className='fas fa-home' />
                ) : (
                  <>
                    {message.type === "work" ? <i className='fas fa-briefcase' /> : <i className='fas fa-envelope' />}
                  </>
                )}
              </>
            )}
          </MessageIcon>
        </IconGroup>
        <div>
          <span>Recipient:</span> {message.recipientName}
        </div>
        <div>
          <span>Email:</span> {message.recipientEmail}
        </div>
        <div>
          <p>
            <span>Message:</span> {message.messageText}
          </p>
        </div>
        <div>
          <span>Time:</span> {moment(message.date).format("hh:mm a")}
        </div>
      </MessageBody>
    </MessageBox>
  );
};

export default Message;
