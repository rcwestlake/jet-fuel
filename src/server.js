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
    url1: [
      {
        url: 'www.espn.com'
      }
    ]
  },
  ftwo: {
    url2: [
      {
        url: 'www.facebook.com'
      }
    ]
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
  const folder = app.locals.folders[name] = {}
  res.json(folder)
})

app.get('/folders/:name', (req, res) => {
  const { name } = req.params
  const folder = app.locals.folders[name]

  if(!folder) {
    res.sendStatus(404)
  }

  res.json(folder)
})

app.post('/folders/:name', (req, res) => {
  const { name } = req.params
  const { url } = req.body
  const date = Date.now()
  const count = 0
  const shortURL = md5(url)
  const folder = app.locals.folders[name]
  const result = Object.keys(folder).map((item) => {
    return folder[item].map((prop) => {
      if(prop.url === url) {
        res.sendStatus(404)
      }
    })
  })

  const newURL = app.locals.folders[name][shortURL] = [{ url, date, count }]

  res.json(folder)
})

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3001!');
});
