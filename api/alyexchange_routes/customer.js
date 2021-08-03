const router = require('express').Router()
const transactionController = require('../../controllers/alyexchange/transaction.controller')
const customerController = require('../../controllers/alyexchange/customer.controller')
const reportController = require('../../controllers/alyexchange/report.controller')
const authentication = require('../middlewares/authentication')
const { canView, canFilter } = require('../../middleware/customer.permission')
const { canGenerate } = require('../../middleware/reports.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
  app.use(prefix, router)

  router.get('/:id/details', authentication, canView(['EXCHANGE']), customerController.findOne)
  router.get('/:id/report', authentication, canGenerate(['EXCHANGE']), reportController.ReportByid)
  router.get('/:id/transactions', authentication, canView(['EXCHANGE']), transactionController.findByIdCustomer)
  router.get('/:id/purchases', authentication, canFilter(['EXCHANGE', 'Compra']), transactionController.findByFilter)
  router.get('/:id/sales', authentication, canFilter(['EXCHANGE', 'Venta']), transactionController.findByFilter)
  router.get('/', authentication, canView(['EXCHANGE']), customerController.findAll)
}
