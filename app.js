const express = require('express');
const socket = require('socket.io');

const app = express();


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const users = {}

const server = app.listen(3000);

const io = socket(server);

io.on('connection', function(socket) {
  console.log('Se unió un usuario');

  socket.on('postMessage', function(message){
    console.log('Mensaje recibido de:', users[socket.id]);
    io.emit('sendMessage', users[socket.id], message);
  });
  socket.on('postName', function(name) {
    users[socket.id] = name;
  });
});


