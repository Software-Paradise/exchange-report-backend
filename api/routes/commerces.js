const router = require('express').Router()
const { commerceController } = require('../../controllers/index')
const authentication = require('../middlewares/authentication')
const { canView, canCreate, canUpdate } = require('../../middleware/commerces.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/commerce', router)

  router.get('/', authentication, canView(['EXCHANGE']), commerceController.findAll)
  router.post('/', authentication, canCreate(['EXCHANGE']), commerceController.create)
  router.put('/:id', authentication, canUpdate(['EXCHANGE']), commerceController.update)
}
