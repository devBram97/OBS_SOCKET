const { fstat } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
let {PythonShell} = require('python-shell');
let options = {
  mode: 'json',
  pythonOptions: ['-u'], // get print results in real-time
  pythonPath: 'C:/Users/Bram/AppData/Local/Programs/Python/Python38/python.exe',
};

currentScene ='stinknerd'; previousScene = 'stinknerd';

const bufferMario = fs.readFileSync('./515a8da287ae3d77dfbf851515c63734.gif');
const bufferLuigi = fs.readFileSync('./SilkyAffectionateBuzzard-size_restricted.gif');
let codShell = '';

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
  console.log('connected');
  buffer = '';
  switch(currentScene){
    case 'cod':
      //console.log(`Stop ${previousScene} Python script`);
      //console.log(`Stuur ${currentScene} animations`);
      //console.log(`Start ${currentScene} Python`);
      codShell = new PythonShell('app.py', options);
      codShell.on('message', function (msg) {
        console.log(msg);
        if(msg.name === 'recon'){
          buffer = bufferLuigi;
        }
        if(msg.name === 'scavenger'){
          buffer = bufferMario;
        }
        io.emit(msg.name, {'show': msg.value, 'img': buffer.toString('base64')});

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
  
});

http.listen(3000, () => {
  console.log('listening on PORT:3000');

});