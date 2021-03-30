const test = require('./routes/test')
const express = require('express')

/**
 *
 * @returns - Instancia de Express
 */
const routes = () => {
  const app = express()
  test(app)
  return app
}

module.exports = routes
