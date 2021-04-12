const { authController } = require('../../controllers/index')
// const authentication = require('../middlewares/authentication')
const router = require('express').Router()

/**
 *
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (app) => {
  app.use('/auth', router)

  router.post('/register', authController.register)
  router.post('/login', authController.login)
}
