const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const md5 = require('md5');

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.locals.folders = {
  fone: {
    url1: {
      actual: 'www.espn.com'
    }
  },
  ftwo: {
    url2: {
      actual: 'www.facebook.com'
    }
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/folders', (req, res) => {
  res.json(app.locals.folders)
});

app.post('/folders', (req, res) => {
  const { name } = req.body
  const id = md5(name)
  app.locals.folders[id] = name
  res.json({ id, name })
})

app.get('/folders/:name', (req, res) => {
  const { name } = req.params
  const folder = app.locals.folders[name]

  res.json(folder)
})



app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3001!');
});
