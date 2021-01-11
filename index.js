const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const buffer = fs.readFileSync('./515a8da287ae3d77dfbf851515c63734.gif');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    
    io.emit('image', buffer.toString('base64'));
  });
  
});

http.listen(3000, () => {
  console.log('listening on PORT:3000');

});