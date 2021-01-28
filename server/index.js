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

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` } )
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined the party!`})


    socket.join(user.room);         // this is what joins the specific user to the room
    console.log("User has Joined!")
    callback();
  })
    

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message});

    callback();
  });



  socket.on('disconnect', () => {
    console.log("User has left!!!");
  })
});




app.use(router)

server.listen(PORT, () => console.log('Server has Started on port ${PORT}'));