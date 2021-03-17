import React, {useState, useEffect} from 'react'
import './MessageDisplay.css';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageDisplay = () => {
  return (
    <ScrollToBottom className='message-display-container'>
      <Message/>
      <Message />
      <Message/>
      <Message />
      <Message />
      <Message />
    </ScrollToBottom>
  )
}

export default MessageDisplay;