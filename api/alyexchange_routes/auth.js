const { authController} = require('../../controllers/alyexchange/index')
// const authentication = require('../middlewares/authentication')
const router = require('express').Router()

/**
 *
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (prefix, app) => {
  app.use(prefix, router)

  router.post('/register', authController.register)
  router.post('/login', authController.login)
}
