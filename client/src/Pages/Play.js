import React, {useState, useEffect} from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InputBar from '../Components/InputBar';
import './Play.css';
import Character from '../Components/Character';
import Messaging from '../Components/Messaging/Messaging';
import SideBar from '../Components/Navigation/SideBar';

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
  const [map, setMap] = useState(localStorage.getItem('map') ? JSON.parse(localStorage.getItem('map')) : null)

  const [npcArray, setNPCArray] = useState(localStorage.getItem('npcArray') ? JSON.parse(localStorage.getItem('npcArray')) : []);

  // useState(localStorage.getItem('npcArray') ? JSON.parse(localStorage.getItem('npcArray')) : []

  // const [npcArray, setNPCArray] = useState([
  //   {icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd3idt3y1vhsqn9.cloudfront.net%2Fwp-content%2Fuploads%2F2013%2F01%2F01144759%2Frogue_color.jpg&f=1&nofb=1" , name: "Bad Bitch"},
  //   {icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Feb%2Ff9%2Faf%2Febf9af680420e750912ec06a0376ac12.jpg&f=1&nofb=1", name: "Phantom of the Opera"},
  //   {icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F003%2F221%2F817%2Flarge%2Ftodor-hristov-halforcmale7f.jpg%3F1471280356&f=1&nofb=1", name: "Orc Man"}
  // ])


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
      socket.on('map', (map) => {
        setMap(map)
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })
    }, [map])

    
    
    useEffect(() => {
      socket.on('npc', (npc) => {
        setNPCArray([...npcArray, npc])
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })
    }, [npcArray])

    // this needs to be done like messages so there is an object for each one


    useEffect(() => {
      socket.on('deleteNPC', (deletedNPC) => {
        setNPCArray((prevNPCArray) => prevNPCArray.filter((nonPlayer) => nonPlayer.name !== deletedNPC.name))
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
    })
  }, [npcArray])


  // useEffect(() => {
  //   socket.on('sendNote', (note) => {
  //     let newNoteStatus = npcArray.filter(npc => { return npc.name === note.name})
  //     newNoteStatus.comments = [...newNoteStatus.comments, note.note]
      
  //     setNPCArray([...npcArray, )
      
  //   })
  // })
      





    useEffect(() => {
      window.localStorage.setItem('stats', JSON.stringify(stats))
      window.localStorage.setItem('partyStats', JSON.stringify(partyData))
      window.localStorage.setItem("map", JSON.stringify(map) )
      window.localStorage.setItem("npcArray", JSON.stringify(npcArray))
    }, [stats, partyData, map, npcArray]);



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
    
  
    const sendMapData = (map) => {
      if(map) {
        socket.emit('sendMapData', map)
      }
      console.log("send map data was triggered")
    } 
    
    
    const sendNPCData = (npc) => {
      if(npc) {
        socket.emit('sendNPCData', npc)
      }
      console.log({npc})
    }



    const deleteNPCData = (npc) => {
      if(npc) {
        socket.emit('deleteNPCData', npc)
      }
      console.log({npc})
    }


    const sendNPCNote = (note) => {
      // if(note) {
      //   socket.emit('sendNPCNote', note)
      // }
      console.log(note)
    }

  
  const showSomething = () => {
    console.log(partyData)
  }
  
  
  
  
  
  
  
  
  
    return (
    <div className="outerContainer">
      <SideBar 
      sendMapData={sendMapData}
      sendNPCData={sendNPCData}
      map={map}
      npcArray={npcArray}
      deleteNPCData={deleteNPCData}
      sendNPCNote={sendNPCNote}
      sendPlayerRoll={sendPlayerRoll} 
      setStats={setStats} 
      sendPlayerData={sendPlayerData}
      name={name} 
      stats={stats}

      />
      
      <button onClick={showSomething}>Click to check map state</button>
      

      <div className="playersContainer">
      {users && users.map((user) => <Character key={user.id} name = {user.name}  individualRole={partyRolls[user.name]} partyData={partyData} stats={stats}/>)}
      </div>

      {/* <div className='controlBox'>

        <InputBar
        // playerData={playerData}
        name={name} 
        sendPlayerData={sendPlayerData}
        sendPlayerRoll={sendPlayerRoll}
        setStats={setStats}
        stats={stats}
        />
      </div> */}
    </div>
  )
}

export default Play
;