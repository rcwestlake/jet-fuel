const express = require('express')

const app = express()
const bodyParser = require('body-parser');
const shortid = require('shortid');
const checkIfExists = require('./helpers/server-helpers')

app.set('port', process.env.PORT || 3001);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH')
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.locals.folders = [
  {
    id: 1,
    title: 'sports',
  },
  {
    id: 2,
    title: 'news',
  },
]

app.locals.urls = [
  {
    urlKey: 'QwewTIlzP',
    url: 'www.espn.com',
    date: '21234333',
    count: 0,
    folder_id: 1,
  },
  {
    urlKey: 'PlORxuDZj',
    url: 'www.football.com',
    date: '3903393',
    count: 0,
    folder_id: 1,
  },
  {
    urlKey: 'rJCRTltyz',
    url: 'www.fox.com',
    date: '4848444',
    count: 0,
    folder_id: 2,
  },
  {
    urlKey: 'ANcUwLpiU',
    url: 'www.cnn.com',
    date: '13930303',
    count: 0,
    folder_id: 2,
  },
]

app.get('/', (req, res) => {
  res.send('Welcome to Irwin');
});

app.get('/folders', (req, res) => {
  res.json(app.locals.folders)
});

app.post('/folders', (req, res) => {
  const { title } = req.body
  const id = app.locals.folders.length + 1

  checkIfExists(app.locals.folders, title, res)

  app.locals.folders.push({ id, title })
  res.json({ id, title })
})

app.get('/folders/:id', (req, res) => {
  const { id } = req.params
  const folders = app.locals.folders.filter((folder) => {
    return folder.id == id
  })

  if (!folders.length) {
    res.sendStatus(404)
  }

  res.json(folders)
})

app.get('/urls', (req, res) => {
  res.json(app.locals.urls)
})

app.get('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  const urls = app.locals.urls.filter((url) => {
    return url.folder_id == folder_id
  })

  if (!urls.length) res.sendStatus(404)

  res.json(urls)
})

app.post('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  const { url } = req.body

  const urlKey = shortid.generate()
  const date = Date.now()
  const count = 0

  checkIfExists(app.locals.urls, url, res)

  app.locals.urls.push({ urlKey, url, date, count, folder_id })

  res.json({ urlKey, url, date, count, folder_id })
})

app.get('/urls/:folder_id/:urlKey', (req, res) => {
  const { urlKey } = req.params
  const selectedURL = app.locals.urls.find(item => item.urlKey == urlKey)

  console.log('response');
  res.redirect(`http://${selectedURL.url}`);
})

app.patch('/urls/:folder_id/:urlKey', (req, res) => {
  const { urlKey } = req.params
  const selectedURL = app.locals.urls.find(item => item.urlKey == urlKey)
  selectedURL.count += 1

  res.json(selectedURL)
})

app.listen(app.get('port'), () => {
  console.log('Jet-fuel app listening on port 3001!');
})
