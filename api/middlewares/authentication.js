const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config/vars.config')

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: 'Acceso denegado, la peticion no posee token de verificacion', success: false })
  }

  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(
    token,
    JWT_SECRET,

    (error, decode) => {
      if (!error) {
        next()
      } else {
        res.status(400).json({ message: error.message, success: false })
      }
    }
  )
}
