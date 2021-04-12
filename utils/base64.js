const path = require('path')
const { readFileSync } = require('fs')

function base64 (filename, data) {
  let extname = path.extname(filename).substr(1)
  extname = extname || 'png'
  return 'data:image/' + extname + ';base64,' + data.toString('base64')
}

const base64Img = {
  base64Sync: function (filename) {
    const data = readFileSync(filename)
    return base64(filename, data)
  }
}

module.exports = base64Img
