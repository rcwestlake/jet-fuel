module.exports = checkIfExists = (folder, url, res) => {
  Object.keys(folder).map((item) => {
    return folder[item].map((prop) => {
      if(prop.url === url) {
        res.sendStatus(404)
        res.end()
      }
    })
  })
}
