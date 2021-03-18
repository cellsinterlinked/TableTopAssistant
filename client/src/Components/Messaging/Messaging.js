import React, {useState, useEffect} from 'react';
import './Messaging.css';
import MessageDisplay from './MessageDisplay';
import DropDowns from './DropDowns';
import MessageInput from './MessageInput';




const Messaging = ({setMessage, sendPlayerMessage, message, setRecipients, users, recipients, messages, name}) => {

  useEffect(() => {
    return () => {
      setRecipients([name])
    }
  },[setRecipients, name])

  //this clears the recipients when they close the drawer (unmount) otherwise it will cause all kinds of issues 
  


  return(
    <div className="messaging-container">
    <MessageDisplay messages={messages} name={name}/>
    <DropDowns users={users} setRecipients={setRecipients} recipients={recipients} name={name}/>
    <MessageInput setMessage={setMessage} sendPlayerMessage={sendPlayerMessage} message={message}/>

    </div>
  )
}

export default Messaging