const test = require('./test')
const commerce = require('./commerces')
const auth = require('./auth')
const users = require('./users')
const failed = require('./failed')
const transactions = require('./transaction')
const customer = require('./customer')

const routes = () => {
  const app = require('express')()
  test('/test', app)
  commerce('/commerce', app)
  auth('/auth', app)
  users('/users', app)
  transactions('/transactions', app)
  customer('/customers', app)
  failed('/', app)
  return app
}

module.exports = routes
