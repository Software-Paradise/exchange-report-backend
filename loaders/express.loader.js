const { urlencoded, json } = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const publicIp = require('public-ip')
const routes = require('../api')
const { initDataBase } = require('../models')
const { sequelizeConfig } = require('../config/index')

/**
 * Configure a express instance
 * @param {Express} app - Express instance
 * @param {Express.Route} api - Express App Routes
 * @return {Express} app
 */
module.exports = async (app) => {
  // If not app, calcel rest execution
  if (!app) {
    console.log('not app')
    return null
  }

  app.enable('trust proxy')

  // config middlewares
  app.use(helmet())
  app.use(cors({ origin: '*' }))
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.use(morgan('dev'))

  // config routes
  app.get('/', async (_, res) => res.send(await publicIp.v4()))
  app.use('/api/alyexchange', routes())

  await initDataBase(sequelizeConfig)

  return app
}
