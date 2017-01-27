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

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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
  database('folders').select()
    .then((folders) => {
      res.status(200).json(folders);
    })
    .catch((error) => {
      console.error('error in get request', error)
      res.sendStatus(404)
    })
})

app.post('/folders', (req, res) => {
  const { title } = req.body
  database('folders').insert({ title })
  .then(() => {
    database('folders').select()
      .then((folders) => {
        res.status(200).json(folders);
      })
      .catch((error) => {
        console.error('error in post request', error)
        res.sendStatus(404)
      });
  })
})

app.get('/folders/:id', (req, res) => {
  const { id } = req.params

  database('folders').where('id', id).select()
    .then((response) => {
      if (!response.length) res.sendStatus(404)
      res.status(200).json(response)
    })
    .catch((error) => {
      console.error('error in get request', error)
      res.sendStatus(404)
    })
})

app.get('/urls', (req, res) => {
  database('urls').select()
    .then((response) => {
      if (!response.length) res.sendStatus(404)
      res.status(200).json(response)
    })
    .catch((error) => {
      console.error('error in get request', error)
      res.sendStatus(404)
    })
})

app.get('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  database('urls').where('folder_id', folder_id).select()
    .then((response) => {
      if (!response.length) res.sendStatus(404)
      res.status(200).json(response)
    })
    .catch((error) => {
      console.error('error in get request', error)
      res.sendStatus(404)
    })
})

app.post('/urls/:folder_id', (req, res) => {
  const { folder_id } = req.params
  const { url } = req.body
  const count = 0
  const urlKey = `irw.in/${shortid.generate()}`

  database('urls').insert({ urlKey, url, count, folder_id })
    .then(() => {
      database('urls').select()
      .then((urls) => {
        res.status(200).json(urls)
      })
      .catch((error) => {
        console.error('error in post request', error)
        res.sendStatus(404)
      })
    })
})

app.patch('/urls/:folder_id/:urlKey', (req, res) => {
  const { urlKey } = req.params
  database('urls').where('urlKey', urlKey)
    .increment('count', 1)
    .then((response) => {
      res.status(200).json({ response })
    })
    .catch((error) => {
      console.error('error with patch request', error)
    })
})

app.get('/urls/:folder_id/:urlKey', (req, res) => {
  const { urlKey } = req.params
  database('urls').where('urlKey', urlKey).select()
    .then((response) => {
      res.redirect(`http://${response.url}`);
    })
    .catch((error) => {
      console.error('error in get request', error)
      res.sendStatus(404)
    })
})

app.listen(app.get('port'), () => {
  console.log('Jet-fuel app listening on port 3001!');
})
