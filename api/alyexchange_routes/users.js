const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const { usersInfoController } = require('../../controllers/alyexchange/index')
const { canView } = require('../../middleware/users.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
  app.use(prefix, router)

  router.get('/', authentication, canView(['EXCHANGE']), usersInfoController.list)
}
