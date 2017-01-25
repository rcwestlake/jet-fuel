module.exports = checkIfExists = (arr, param, res) => {
  arr.map((item) => {
    console.log(item)
    if (item.url == param) {
      res.sendStatus(404)
    }
    if (item.title == param) {
      res.sendStatus(404)
    }
  })
}
