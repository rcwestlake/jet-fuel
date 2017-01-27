const checkIfExists = (arr, param, res) => {
  arr.map((item) => {
    if (item.url == param || item.title == param) {
      res.sendStatus(404)
    }
  })
}

module.exports = checkIfExists
