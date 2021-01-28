import React, { useState } from  'react';
import { Link } from 'react-router-dom';
import './Join.css';


const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  

  return (
    <div className="joinOuterContainer">
      <div className='joinInnerContainer'>
        <h1 className="heading">Sign In!</h1>
        <div className="joinInputBox"><input placeholder="Name" className="joinInput" type="text" value={name} onChange={(event) => setName(event.target.value)}></input></div>
        <div className="joinInputBox"><input placeholder="Room" className="joinInput" type="text" value={room} onChange={(event) => setRoom(event.target.value)}></input></div>
        <Link style={{textDecoration: "none", fontFamily: "'Niconne', cursive"}} onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/play?name=${name}&room=${room}`}>
          <button className="signInButton" type="submit">Sign In</button>
        </Link>
      </div>
    </div>

  )
}

export default Join;