const checkIfExists = require('./helpers/server-helpers')
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

app.locals.folders = [
  {
    id: 1,
    title: 'sports'
  },
  {
    id: 2,
    title: 'news'
  }
]

app.locals.urls = [
  {
    urlKey: '1235jdflkas;',
    url: 'www.espn.com',
    date: '21234333',
    count: 0,
    folder_id: 1
  },
  {
    urlKey: '900920sdhkf;',
    url: 'www.football.com',
    date: '3903393',
    count: 0,
    folder_id: 1
  },
  {
    urlKey: '9938dfnkasla;',
    url: 'www.fox.com',
    date: '4848444',
    count: 0,
    folder_id: 2
  },
  {
    urlKey: '7383jadfs;',
    url: 'www.cnn.com',
    date: '13930303',
    count: 0,
    folder_id: 2
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/folders', (req, res) => {
  res.json(app.locals.folders)
});

app.post('/folders', (req, res) => {
  const { title } = req.body
  const uid = app.locals.folders.length + 1
  console.log(uid)
  app.locals.folders[uid] = { uid, title }

  res.json({ uid, title })
})

app.get('/urls', (req, res) => {
  res.json(app.locals.urls)
})

app.get('/urls/:id', (req, res) => {
  const { id } = req.params
  const urls = app.locals.urls.filter(url => {
    return url.folder_id == id
  })

  res.json(urls)
})

app.get('/folders/:id', (req, res) => {
  const { id } = req.params
  const folder = app.locals.folders.filter((folder) => {
     return folder.id == id
  })

  if(!folder.length) {
    res.sendStatus(404)
  }

  res.json(folder)
})

app.post('/folders/:name', (req, res) => {
  const { name } = req.params
  const { url } = req.body
  const date = Date.now()
  const count = 0

  const urlKey = md5(url)
  const folder = app.locals.folders[name]

  checkIfExists(folder, url, res)

  const shortURL = app.locals.folders[name][urlKey] = [{ url, date, count }]

  res.json({ urlKey, shortURL })
})

app.patch('/folders/:name/:urlKey', (req, res) => {
  const { name, urlKey } = req.params
  const shortURL = app.locals.folders[name][urlKey]
  const count = shortURL[0].count++
  const url = shortURL[0].url

  res.json(url)
})

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3001!');
});
