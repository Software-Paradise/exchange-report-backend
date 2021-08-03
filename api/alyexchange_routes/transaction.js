const router = require('express').Router()
const transactionController = require('../../controllers/alyexchange/transaction.controller')
const authentication = require('../middlewares/authentication')
const { canCreate, canView } = require('../../middleware/transaction.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
  app.use(prefix, router)

  router.get('/:id/details', authentication, canView(['EXCHANGE']), transactionController.findOne)
  router.get('/purchases', authentication, canView(['EXCHANGE']), transactionController.findAllPurchases)
  router.get('/sales', authentication, canView(['EXCHANGE']), transactionController.findAllSales)
  router.get('/agents', authentication, canView(['EXCHANGE']), transactionController.findAll)
  router.post('/', authentication, canCreate(['EXCHANGE']), transactionController.create)
}
