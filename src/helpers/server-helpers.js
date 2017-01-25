module.exports = checkIfExists = (arr, param, res) => {
  arr.map((item) => {
    if (item.url == param || item.title == param) {
      console.log('it hit')
      res.sendStatus(404)
    }
  })
}
