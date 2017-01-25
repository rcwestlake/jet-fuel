module.exports = checkIfExists = (urls, url, res) => {
  urls.map((item) => {
    if (item.url == url) {
      res.sendStatus(404)
    }
  })
}
