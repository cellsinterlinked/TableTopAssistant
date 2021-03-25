import React, {useState, useEffect} from 'react'
import './MessageInput.css';

const MessageInput = ({message, setMessage, sendPlayerMessage}) => {
  return(
    <form className="messaging-form">
    <textarea
      className="messaging-input"
      type=""
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendPlayerMessage(event) : null}
    />
    <button className="messaging-sendButton" onClick={e => sendPlayerMessage(e)}>Send</button>
  </form>
  )
}

export default MessageInput;

