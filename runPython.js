let {PythonShell} = require('python-shell');
let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    // scriptPath: 'path/to/my/scripts',
  };

PythonShell.runString('x=1+1;print(x)', options, function (err, res) {
  if (err) throw err;
  console.log('finished');
  console.log(res);
});