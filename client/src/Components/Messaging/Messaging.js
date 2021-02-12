import React, {useState, useEffect} from 'react';
import './Messaging.css';
import MessageDisplay from './MessageDisplay';
import DropDowns from './DropDowns';
import MessageInput from './MessageInput';




const Messaging = (props) => {
  return(
    <div className="messaging-container">
    <MessageDisplay/>
    <DropDowns />
    <MessageInput />

    </div>
  )
}

export default Messaging