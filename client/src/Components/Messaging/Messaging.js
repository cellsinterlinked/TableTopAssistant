import React, {useState, useEffect} from 'react';
import './Messaging.css';
import MessageDisplay from './MessageDisplay';
import DropDowns from './DropDowns';
import MessageInput from './MessageInput';
import MessageDropdown from '../Reusable/MessageDropDown';




const Messaging = ({setMessage, sendPlayerMessage, message, setRecipients, users, recipients, messages, name, unreadMessages, setUnreadMessages}) => {

  useEffect(() => {
    return () => {
      setRecipients([name])
      // console.log(recipients)
    }
  },[setRecipients, name])

  useEffect(() => {
    setUnreadMessages(0)
  }, [])

  //this clears the recipients when they close the drawer (unmount) otherwise it will cause all kinds of issues 
  


  return(
    <div className="messaging-container">
    <DropDowns users={users} setRecipients={setRecipients} recipients={recipients} name={name}/>
    {/* <MessageDropdown items={users} name={name} singleState={recipients} setSingleState={setRecipients} title="CHOOSE RECIPIENTS"/> */}
    <MessageDisplay messages={messages} name={name}/>
    <MessageInput setMessage={setMessage} sendPlayerMessage={sendPlayerMessage} message={message}/>

    </div>
  )
}

export default Messaging