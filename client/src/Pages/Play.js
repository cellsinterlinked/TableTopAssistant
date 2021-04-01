import React, {useState, useEffect} from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Play.css';
import Character from '../Components/Character';
import SideBar from '../Components/Navigation/SideBar';



let socket;
const Play
 = ({ location }) => {
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
   const [users, setUsers] = useState(null);
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState(localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')): [])
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
  const [npcNotes, setNPCNotes] = useState(localStorage.getItem('npcNotes') ? JSON.parse(localStorage.getItem('npcNotes')):{})
  const [recipients, setRecipients] = useState([])
  const [npcArray, setNPCArray] = useState(localStorage.getItem('npcArray') ? JSON.parse(localStorage.getItem('npcArray')) : []);
  const [notePost, setNotePost] = useState("")
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [userYPosition, setUserYPosition] = useState(0)
  const [userXPosition, setUserXPosition] = useState(0)
  const [partyPosition, setPartyPosition] = useState(localStorage.getItem('partyPosition') ? JSON.parse(localStorage.getItem('partyPosition')) :{})


  

  const ENDPOINT = 'localhost:5000'

  
  
  
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);
    setStats({...stats, user: name})
    setRecipients([...recipients, name])
    //the set recipients here makes it so that the sender is always able to view his own messages, and doesn't have to click his own name checkbox in messages
    
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

    
    // under construction 
    useEffect(() => {
      socket.on('npc', (npc) => {
        setNPCArray([...npcArray, npc])
        setNPCNotes({...npcNotes, [npc.name]:[]})
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
      })
    }, [npcArray, npcNotes])

    // this needs to be done like messages so there is an object for each one


    useEffect(() => {
      socket.on('deleteNPC', (deletedNPC) => {
        setNPCArray((prevNPCArray) => prevNPCArray.filter((nonPlayer) => nonPlayer.name !== deletedNPC.name))
      })
      socket.on('roomData', ({ users }) => {
        setUsers(users);
    })
  }, [npcArray])

//ooooooooooooooooooffffffffffffff
  useEffect(() => {
    socket.on('sendNote', (sendNote) => {
      console.log(sendNote);
      console.log(npcNotes[sendNote.name].push(sendNote.note))
      // setNPCNotes({...npcNotes, [note.name]: npcNotes[note.name].push(note.note)})
      window.localStorage.setItem("npcNotes", JSON.stringify(npcNotes))
     

      // setNPCNotes({...npcNotes, [note.name]: newObj})
      
    })
    socket.on('roomData', ({ users }) => {
      setUsers(users);
  })
},[npcNotes])
      
// end the horror 


useEffect(() => {
  socket.on('playerMessage',  (playerMessage) => {
    setMessages([...messages, playerMessage ])
    if (playerMessage.recipients.includes(name) && playerMessage.name !== name ){setUnreadMessages(unreadMessages + 1)}
    console.log("use effect triggered")
  })
  socket.on('roomData', ({ users }) => {
    setUsers(users);
})
}, [messages, unreadMessages, name])



useEffect(() => {
  socket.on('sendPlayerPosition', (sendPlayerPosition) => {
    setPartyPosition({...partyPosition, [sendPlayerPosition.name]:{position: sendPlayerPosition.position, icon: sendPlayerPosition.icon}})
  })
  socket.on('roomData', ({ users}) => {
    setUsers(users)
  })
}, [partyPosition])




    useEffect(() => {
      window.localStorage.setItem('stats', JSON.stringify(stats))
      window.localStorage.setItem('partyStats', JSON.stringify(partyData))
      window.localStorage.setItem("map", JSON.stringify(map) )
      window.localStorage.setItem("npcArray", JSON.stringify(npcArray))
      window.localStorage.setItem("npcNotes", JSON.stringify(npcNotes))
      window.localStorage.setItem('messages', JSON.stringify(messages))
      window.localStorage.setItem('partyPosition', JSON.stringify(partyPosition))
      window.localStorage.setItem('users', JSON.stringify(users))
    }, [stats, partyData, map, npcArray, npcNotes, messages, partyPosition, users]);



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

    //possibly failing since sending note into function instead of event and note being a state in the play component
    const sendNPCNote = (name, note) => {
      if(note && name) {
        socket.emit('sendNPCNote', name, note)
      }
      console.log(note)
    }


    const sendPlayerMessage = (event) => {
      event.preventDefault()
      if(message && recipients !== [] && stats.portrait) {
        let icon = stats.portrait
        socket.emit('sendPlayerMessage', message, recipients, name, icon)
        console.log(`message triggered ${message}`)
      }
    }


    const sendPlayerPosition = (position) => {
      if (userXPosition !== 0 && userYPosition !== 0 && stats.portrait) {
        let icon = stats.portrait
        socket.emit('sendPlayerPosition', position, name, icon)
        console.log('triggered send player position')
      }
    }
      
    




  
  const showSomething = () => {
    console.log(npcNotes);
    
  }
  
  
  
  
  
  
  
  
  
    return (
    <div className="outerContainer">
      <SideBar 
      setRecipients={setRecipients}
      recipients={recipients}
      messages={messages}
      users={users}
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
      setMessage={setMessage}
      sendPlayerMessage={sendPlayerMessage}
      message={message}
      unreadMessages={unreadMessages}
      setUnreadMessages={setUnreadMessages}
      setUserXPosition={setUserXPosition}
      setUserYPosition={setUserYPosition}
      userXPosition={userXPosition}
      userYPosition={userYPosition}
      sendPlayerPosition={sendPlayerPosition}
      partyPosition={partyPosition}
      notePost={notePost}
      setNotePost={setNotePost}
      npcNotes={npcNotes}


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