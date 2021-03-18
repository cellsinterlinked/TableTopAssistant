import React from 'react';
import './Message.css';


const Message = ({message}) => {


  return (
    <div className="messageBubble">
      <div className="message-char-icon">
          <img className="char-message-head" src={message.icon} alt=""></img>
      </div>
      <div className="message-message">
        <h2>{message.name} :</h2>
        <p>{message.message}</p>
      </div>


    </div>
  )
}

export default Message;