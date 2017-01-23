const express = require('express');
const app = express();
const http = require('http').Server(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/test', function(req, res) {
  res.send('on the test route')
});

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3001!');
});
