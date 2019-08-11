import React from "react";
import moment from "moment";

import { MessageBox, MessageType, MessageBody, MessageIcon, IconGroup, Info } from "../../styles/messagesStyles";

const Message = ({ message, row, handleOpen, deleteMessage }) => {
  return (
    <MessageBox row={row} onClick={() => handleOpen(message)} disabled={message.sent}>
      <MessageType type={message.type} />
      <MessageBody sent={message.sent} row={row}>
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
          {!row && (
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
          )}
        </IconGroup>
        <Info row={row}>
          <span>Recipient:</span> {message.recipientName}
        </Info>
        <Info row={row}>
          <span>Email:</span> {message.recipientEmail}
        </Info>
        <p>
          <span>Message:</span> {message.messageText}
        </p>
        <Info row={row}>
          <span>Time:</span> {moment(message.date).format("hh:mm a")}
        </Info>
      </MessageBody>
    </MessageBox>
  );
};

export default Message;
