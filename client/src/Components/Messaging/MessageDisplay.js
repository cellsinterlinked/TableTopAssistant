import React, {useState, useEffect} from 'react'
import './MessageDisplay.css';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageDisplay = ({messages, name}) => {
  const [newArr, setNewArr] = useState(null)

  useEffect(() => {
    setNewArr(messages.filter((message) => {
      return message.recipients.includes(name)
    }))
    
    


  },[messages, name])

   return (
    <ScrollToBottom className='message-display-container'>
      {messages && newArr && newArr.map((message) => <Message key={message.message} message={message}/> )}
    </ScrollToBottom>
  )
}

export default MessageDisplay;