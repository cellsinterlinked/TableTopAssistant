import React from 'react';
import './Message.css';


const Message = (props) => {


  return (
    <div className="messageBubble">
      <div className="message-char-icon">
          <img className="char-message-head" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fcovers%2Fimages%2F000%2F962%2F185%2Flarge%2Fcurro-rodriguez-heavyarmor1.jpg%3F1437145425&f=1&nofb=1"alt=""></img>
      </div>
      <div className="message-message">
        <p>Hey Bro, this is a test message to see how absolutely crappy this looks in a message bubble yadda yadda yadda yadda yadda yadda</p>
      </div>


    </div>
  )
}

export default Message;