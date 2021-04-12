const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const { usersInfoController } = require('../../controllers/index')
const { canView } = require('../../middleware/users.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/users', router)

  router.get('/', authentication, canView(['EXCHANGE']), usersInfoController.list)
}
