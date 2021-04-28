import React, { useState } from  'react';
import { Link } from 'react-router-dom';
import ErrorModal from '../Components/Modal/ErrorModal'
import './Join.css';
import FrontDropdown from '../Components/Reusable/FrontDropDown';


const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [playerType, setPlayerType] = useState([{id:1, value: 'PLAYER'}])

  const items = [
    {
      id: 1,
      value: 'PLAYER'
    },
    {
      id: 2,
      value: 'DM'
    }
  ]



  const showState = () => {
    console.log(playerType[0].value);
  }
  
  

  return (
    <div className="joinOuterContainer">

      <div className='joinInnerContainer'>
        <h1 className="heading">JOIN THE ADVENTURE</h1>
        <div className="joinInputBox"><input placeholder="Name" className="joinInput" type="text" value={name} onChange={(event) => setName(event.target.value)}></input></div>
        <div className="joinInputBox"><input placeholder="Room" className="joinInput" type="text" value={room} onChange={(event) => setRoom(event.target.value)}></input></div>
        <FrontDropdown items={items} title={'YOU ARE...'} headingStyle="frontPage spaceTop" setSingleState={setPlayerType} singleState={playerType}/>
        <Link style={{textDecoration: "none", fontFamily: "'Niconne', cursive"}} onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play?name=${name}&room=${room}&role=${playerType[0].value}`}>
          <button className="signInButton" type="submit">JOIN PARTY</button>
        </Link>
        <button onClick={showState}>Herrooo</button>
      </div>
    </div>

  )
}

export default Join;

// to={`/play?name=${name}&room=${room}$role=${playerType[0].value}`}