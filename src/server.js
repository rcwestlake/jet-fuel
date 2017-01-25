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
    urlKey: '1235jdflkas',
    url: 'www.espn.com',
    date: '21234333',
    count: 0,
    folder_id: 1
  },
  {
    urlKey: '900920sdhkf',
    url: 'www.football.com',
    date: '3903393',
    count: 0,
    folder_id: 1
  },
  {
    urlKey: '9938dfnkasla',
    url: 'www.fox.com',
    date: '4848444',
    count: 0,
    folder_id: 2
  },
  {
    urlKey: '7383jadfs',
    url: 'www.cnn.com',
    date: '13930303',
    count: 0,
    folder_id: 2
  }
]

app.get('/', (req, res) => {
  res.send('Welcome to Irwyn');
});

app.get('/folders', (req, res) => {
  res.json(app.locals.folders)
});

app.post('/folders', (req, res) => {
  const { title } = req.body
  const id = app.locals.folders.length + 1
  app.locals.folders.push({ id, title })

  res.json({ id, title })
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

app.get('/urls', (req, res) => {
  res.json(app.locals.urls)
})

app.get('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  const urls = app.locals.urls.filter(url => {
    return url.folder_id == folder_id
  })

  if(!urls.length) res.sendStatus(404)

  res.json(urls)
})

app.post('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  const { url } = req.body

  const urlKey = md5(url)
  const date = Date.now()
  const count = 0

  checkIfExists(app.locals.urls, url, res)

  app.locals.urls.push({ urlKey, url, date, count, folder_id })

  res.json({ urlKey, url, date, count, folder_id })
})

app.patch('/urls/:folder_id/:urlKey', (req, res) => {
  const { folder_id, urlKey } = req.params
  const selectedURL = app.locals.urls.find((item) => item.urlKey == urlKey)
  const count = selectedURL.count++
  const url = selectedURL.url

  res.json(selectedURL)
})

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3001!');
});
