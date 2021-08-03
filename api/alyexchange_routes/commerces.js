const router = require('express').Router()
const { commerceController } = require('../../controllers/alyexchange/index')
const authentication = require('../middlewares/authentication')
const { canView, canCreate, canUpdate } = require('../../middleware/commerces.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
  app.use(prefix, router)

  router.get('/', authentication, canView(['EXCHANGE']), commerceController.findAll)
  router.post('/', authentication, canCreate(['EXCHANGE']), commerceController.create)
  router.put('/:id', authentication, canUpdate(['EXCHANGE']), commerceController.update)
}
