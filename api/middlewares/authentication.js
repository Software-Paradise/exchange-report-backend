const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../../config/vars.config')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.json({ success: false, message: 'La peticion no contiene un token de acceso' }).status(401)

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, _) => {
    if (err) return res.json({ message: 'El token no es valido', success: false }).status(403)
    res.next()
  })
}
