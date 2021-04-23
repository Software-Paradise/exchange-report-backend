const router = require('express').Router()
const transactionController = require('../../controllers/transaction.controller')
const customerController = require('../../controllers/customer.controller')
const reportController = require('../../controllers/report.controller')
const authentication = require('../middlewares/authentication')
const { canView, canFilter } = require('../../middleware/customer.permission')
const { canGenerate } = require('../../middleware/reports.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/customers', router)

  router.get('/:id/details', authentication, canView(['EXCHANGE']), customerController.findOne)
  router.get('/:id/report', authentication, canGenerate(['EXCHANGE']), reportController.ReportByid)
  router.get('/:id/transactions', authentication, canView(['EXCHANGE']), transactionController.findByIdCustomer)
  router.get('/:id/purchases', authentication, canFilter(['EXCHANGE', 'Compra']), transactionController.findByFilter)
  router.get('/:id/sales', authentication, canFilter(['EXCHANGE', 'Venta']), transactionController.findByFilter)
  router.get('/', authentication, canView(['EXCHANGE']), customerController.findAll)
}
