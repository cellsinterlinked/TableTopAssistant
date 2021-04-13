import React, {useState, useEffect} from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Play.css';
import Character from '../Components/Character';
import SideBar from '../Components/Navigation/SideBar';
import Modal from '../Components/Modal/Modal';
import ErrorModal from '../Components/Modal/ErrorModal';
import Help from '../Components/Modal/Help';
import {Howl, Howler} from 'howler';
import NotificationSound from '../Resources/juntos-607.mp3';
import NewPlayerSound from '../Resources/attention-seeker-480.mp3';


let socket;
const Play
 = ({ location }) => {
   const [showModal, setShowModal] = useState(false);
   const [name, setName] = useState('');
   const [room, setRoom] = useState('');
   const [role, setRole] = useState('')
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
  const [map, setMap] = useState(localStorage.getItem('map') ? JSON.parse(localStorage.getItem('map')) : "")
  const [npcNotes, setNPCNotes] = useState(localStorage.getItem('npcNotes') ? JSON.parse(localStorage.getItem('npcNotes')):{})
  const [recipients, setRecipients] = useState([])
  const [npcArray, setNPCArray] = useState(localStorage.getItem('npcArray') ? JSON.parse(localStorage.getItem('npcArray')) : []);
  const [notePost, setNotePost] = useState("")
  const [unreadMessages, setUnreadMessages] = useState(0)

  const [unseenNPC, setUnseenNPC] = useState(0)
  const [unseenMap, setUnseenMap] = useState(0)

  const [userYPosition, setUserYPosition] = useState(0)
  const [userXPosition, setUserXPosition] = useState(0)
  const [partyPosition, setPartyPosition] = useState(localStorage.getItem('partyPosition') ? JSON.parse(localStorage.getItem('partyPosition')) :{})
  const [error, setError] = useState(null)

  const audioClips = [
    {sound: NotificationSound, label: "notification"},
    {sound: NewPlayerSound, label: "newPlayer"}
  ]
  

  const ENDPOINT = 'localhost:5000'

  
  
  
  
  useEffect(() => {
    const { name, room, role } = queryString.parse(location.search);
    
    socket = io(ENDPOINT)
    setRole(role)
    setName(name.toLowerCase());
    setRoom(room);

    if (role === 'PLAYER') {setStats({...stats, user: name})}
    if (role === 'DM') (setStats({...stats, user: name, portrait: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F51%2FBKH-kitten-blue.jpg&f=1&nofb=1"}))
    setRecipients([...recipients, name])
    //the set recipients here makes it so that the sender is always able to view his own messages, and doesn't have to click his own name checkbox in messages
    
    // set initial player state here?
    //we have to grab the player role from the url and then put it into this emit which will send to users.js in back end. <<<<<<<<<<
    socket.emit('join', { name, room, role },  (error) => {
      if(error) {
        setError(error);
      } 
    });

  }, [ENDPOINT, location.search]);
    

  
  
  // useEffect(() => {
  //   socket.on("roomData", ({ users }) => {
  //     setUsers(users);
  //     // notificationAudio(audioClips[1].sound)
  //   });
  // }, [])// this could be an issue if it keeps playing any time there is a refresh. 
  // // possible have chime every time the number of users increases, and if it decreases have a different sound. 
  
  
  
  
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
        setUnseenMap(unseenMap + 1)
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
        setUnseenNPC(unseenNPC + 1)
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
    if (playerMessage.recipients.includes(name) && playerMessage.name !== name ){
      setUnreadMessages(unreadMessages + 1)
      notificationAudio(audioClips[0].sound)
    }
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
      
    
    const notificationAudio = (src) => {
      const sound = new Howl({
        src
      })
      sound.play();
    }


  const clearError = () => {
    setError(null);
  }
  
  const closeModal = () => {
    setShowModal(false)
  }
  
  const showSomething = () => {
    setShowModal(!showModal);
    
  }
  
  
  const displayTest = () => {
    console.log(messages)
  }
  
  
  
  
  
    return (
    <div className="outerContainer">
      <ErrorModal error={error} onClear={clearError} />
    <Modal 
      show={showModal === true} 
      children={<Help />}
      onCancel={closeModal}
      header={<p>SELECT A TOPIC FOR EXPLANATION</p>}
      />
      {!error && <SideBar 
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

      unseenMap={unseenMap}
      setUnseenMap={setUnseenMap}
      unseenNPC={unseenNPC}
      setUnseenNPC={setUnseenNPC}

      setUserXPosition={setUserXPosition}
      setUserYPosition={setUserYPosition}
      userXPosition={userXPosition}
      userYPosition={userYPosition}
      sendPlayerPosition={sendPlayerPosition}
      partyPosition={partyPosition}
      notePost={notePost}
      setNotePost={setNotePost}
      npcNotes={npcNotes}
      showSomething={showSomething}
      showModal={showModal}
      role={role}

      />}
      
    <button onClick={displayTest}>Click to check map state</button>
      

      <div className="playersContainer">
      {users && users.filter(user => user.role !== "dm").map((user) => <Character key={user.id} name = {user.name}  individualRole={partyRolls[user.name]} partyData={partyData} stats={stats}/>)}
      {/* {users && users.map((user) => <Character key={user.id} name = {user.name}  individualRole={partyRolls[user.name]} partyData={partyData} stats={stats}/>)} */}
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