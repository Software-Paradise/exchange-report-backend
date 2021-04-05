const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../../config/vars.config')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    res.status(401)
    return res.send('token not found in http header')
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403)
      return res.send('Token is invalid')
    }
    req.data = data
    next()
  })
}
