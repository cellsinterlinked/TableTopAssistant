const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const PORT = process.env.PORT || 5000

const router = require('./router');
const { callbackify } = require('util');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room})

    if(error) return callback(error)  // if there is an arror it gets out of the function with return
    
    socket.join(user.room);         // this is what joins the specific user to the room

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` } )
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined the party!`})

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    console.log("User has Joined!")
    callback();
  })
    

  socket.on('sendPlayerData', (playerData, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('playerData', { user: user.name, text: playerData});

    // callback();
  });



  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});





app.use(router)

server.listen(PORT, () => console.log('Server has Started on port ${PORT}'));