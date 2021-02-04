import React, {useState, useEffect} from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InputBar from '../Components/InputBar';
import './Play.css';
import Character from '../Components/Character';

let socket;

const Play
 = ({ location }) => {
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
   const [users, setUsers] = useState(null);
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState({})
   const [playerData, setPlayerData] = useState()
   const [partyData, setPartyData] = useState({})


  






   const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);
    // set initial player state here?

    
    socket.emit('join', { name, room },  (error) => {
      if(error) {
        alert(error);
      }
    });

    
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('playerData', (playerData) => {
        setPartyData({...partyData, playerData})
        // I think the problem might be here
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
     
    }, [partyData]);

    const sendPlayerData = (event) => {
      event.preventDefault();
      if(playerData) {
        socket.emit('sendplayerData', playerData)
        // socket.emit('sendMessage', message)
        console.log(playerData)
      }
    }
    
  return (
    <div className="outerContainer">
     <button onClick={() => console.log(messages)}>Messages</button>
      <div className="playersContainer">
      {users && users.map((user) => <Character key={user.id} name = {user.name} messages={messages}/>)}
      {/* <button onClick={() => console.log(users)}>Press Me</button> */}
      </div>

      <div className='controlBox'>

        <InputBar
        name={name} 
        message={playerData}
        setMessage={setPlayerData}
        sendMessage={sendPlayerData}
        />
      </div>
    </div>
  )
}

export default Play
;