const test = require('./routes/test')
const commerce = require('./routes/commerces')
const auth = require('./routes/auth')
const users = require('./routes/users')
const failed = require('./routes/failed')
const express = require('express')

/**
 *
 * @returns - Instancia de Express
 */
const routes = () => {
  const app = express()
  test(app)
  commerce(app)
  auth(app)
  users(app)
  failed(app)
  return app
}

module.exports = routes
