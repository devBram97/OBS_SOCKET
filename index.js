const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
let {PythonShell} = require('python-shell');
let options = {
  mode: 'text',
  pytonPath: 'python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '.'
};

currentScene ='stinknerd'; previousScene = 'stinknerd';

const bufferMario = fs.readFileSync('./515a8da287ae3d77dfbf851515c63734.gif');
const bufferLuigi = fs.readFileSync('./SilkyAffectionateBuzzard-size_restricted.gif');

app.get('/', (req, res) => {
  currentScene = 'stinknerd';
  res.sendFile(__dirname + '/index.html');
});

app.get('/cod', (req, res) => {
  currentScene = 'cod';
  res.sendFile(__dirname + '/index.html');
});

app.get('/fortnite', (req, res) => {
  currentScene = 'fortnite';
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  buffer = '';
  switch(currentScene){
    case 'cod':
      console.log(`Stop ${previousScene} Python script`);
      console.log(`Stuur ${currentScene} animations`);
      console.log(`Start ${currentScene} Python`);
      PythonShell.run('app.py', options, function(err){
        if(err) throw err;
        console.log('finished');
      });
      break;
    case 'fortnite':
      console.log(`Stop ${previousScene} Python script`);
      console.log(`Stuur ${currentScene} animations`);
      console.log(`Start ${currentScene} Python`);
      break;
    default:
      console.log(`Stop ${previousScene} Python script`);
      console.log(`Stuur ${currentScene} animations`);
      console.log(`Start ${currentScene} Python`);
  };
  previousScene = currentScene;


  socket.on('disconnect', () => {
  });
  socket.on('contract', (msg) => {
    if(msg.name === 'recon'){
      buffer = bufferLuigi;
    } else if(msg.name === 'scavenger'){
      buffer = bufferMario;
    }

    io.emit(msg.name, {'show': msg.value, 'img': buffer.toString('base64')});
  });
  
});

http.listen(3000, () => {
  console.log('listening on PORT:3000');

});