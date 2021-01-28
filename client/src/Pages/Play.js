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
   const [messages, setMessages] = useState([])

   const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);
    
    socket.emit('join', { name, room },  (error) => {
      if(error) {
        alert(error);
      }
    });

    
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
        setMessages([...messages, message])
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });

    }, [messages]);

    const sendMessage = (event) => {
      event.preventDefault();
      if(message) {
        socket.emit('sendMessage', message, () => setMessage(''))
        console.log(message)
      }
    }
    
  return (
    <div className="outerContainer">
      <div className="playersContainer">
      {users && users.map((user) => <Character key={user.id} name = {user.name} />)}
      {/* <button onClick={() => console.log(users)}>Press Me</button> */}
      </div>

      <div className='controlBox'>

        <InputBar
        name={name} 
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default Play
;