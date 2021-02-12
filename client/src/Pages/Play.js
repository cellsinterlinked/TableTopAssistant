import React, {useState, useEffect} from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InputBar from '../Components/InputBar';
import './Play.css';
import Character from '../Components/Character';
import Messaging from '../Components/Messaging/Messaging';

let socket;



const Play
 = ({ location }) => {
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
   const [users, setUsers] = useState(null);
   const [message, setMessage] = useState(''); //later use messages for DM notes to specific players? message box in UI?
   const [messages, setMessages] = useState({})
  //  const [playerData, setPlayerData] = useState()
   const [partyData, setPartyData] = useState(localStorage.getItem('partyStats') ? JSON.parse(localStorage.getItem('partyStats')) : {})
   const [partyRolls, setPartyRolls] = useState({})
   const [stats, setStats] = useState(localStorage.getItem('stats') ? JSON.parse(localStorage.getItem('stats')) : {
    user: '',
    hp: '0',
    ac: '0',
    melee: '0',
    ranged: '0',
    str: '0',
    dex: '0',
    con: '0',
    int: '0',
    wis: '0',
    cha: '0',
    dice: 0,
    portrait: ""
  })
  const [roll, setRoll] = useState(0);


  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);
    setStats({...stats, user: name})
    
    // set initial player state here?

    
    socket.emit('join', { name, room },  (error) => {
      if(error) {
        alert(error);
      }
    });

    
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('stats', (stats) => {
        setPartyData({...partyData, [stats.user]: stats})
        // I think the problem might be here(fixed)
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }, [partyData]);
     


    useEffect(() => {
      socket.on('number', (number) => {
        setPartyRolls({...partyRolls, [number.user]: number})
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })
    }, [partyRolls])




    useEffect(() => {
      window.localStorage.setItem('stats', JSON.stringify(stats))
      window.localStorage.setItem('partyStats', JSON.stringify(partyData))
    }, [stats, partyData]);



    const sendPlayerData = (event) => {
      event.preventDefault();
      if(stats) {
        socket.emit('sendPlayerData', stats)
        console.log(stats)
      }
    }

    const sendPlayerRoll = (number) => {
      if(number) {
        socket.emit('sendPlayerRoll', number)
        console.log(number)
      }
    }
    
  return (
    <div className="outerContainer">
      <Messaging />
     {/* <button onClick={() => console.log(stats)}>Messages</button>
      <button onClick={() => console.log(JSON.parse(localStorage.getItem('stats')))}>Local Storage</button>
      <button onClick ={() => console.log(partyRolls)}>Party Rolls</button> */}
      <div className="playersContainer">
      {users && users.map((user) => <Character key={user.id} name = {user.name}  individualRole={partyRolls[user.name]} partyData={partyData} stats={stats}/>)}
      </div>

      <div className='controlBox'>

        <InputBar
        name={name} 
        // playerData={playerData}
        sendPlayerData={sendPlayerData}
        sendPlayerRoll={sendPlayerRoll}
        setStats={setStats}
        stats={stats}
        />
      </div>
    </div>
  )
}

export default Play
;