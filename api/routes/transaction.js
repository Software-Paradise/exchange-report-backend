const router = require('express').Router()
const transactionController = require('../../controllers/transaction.controller')
const authentication = require('../middlewares/authentication')
const { canCreate, canView } = require('../../middleware/transaction.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/transactions', router)

  router.get('/:id/details', authentication, canView(['EXCHANGE']), transactionController.findOne)
  router.get('/agents', authentication, canView(['EXCHANGE']), transactionController.findAll)
  router.post('/', authentication, canCreate(['EXCHANGE']), transactionController.create)
}
