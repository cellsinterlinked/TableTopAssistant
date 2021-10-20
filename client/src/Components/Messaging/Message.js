import React from 'react';
import './Message.css';


const Message = ({message}) => {


  return (
    <div className="messageBubble">
      <div className="message-char-icon">
          <img className="char-message-head" src={message.icon} alt=""></img>
      </div>
      <div className="message-message">
        <div className="from-container">
        <h2 style={{color: "white", marginRight: "0.6rem"}}>From: </h2>
        <h2> {message.name} </h2>
        </div>
        <div className="to-container">
          <div className='to-left'>
          <h2 style={{color: "white"}}>To:</h2>
          </div>
          <div className='to-right'>
            {message.recipients.map(player => <p key={player} style={{color: "rgb(21, 169, 8)", marginRight: "5px"}}>{` ${player} `} </p>)}
          </div>
        </div>

        <p style={{marginBottom: "5px"}}>{message.message}</p>
       
      </div>


    </div>
  )
}

export default Message;