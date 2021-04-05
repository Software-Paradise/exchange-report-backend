const router = require('express').Router()
const { commerceController } = require('../../controllers/index')
const authentication = require('../middlewares/authentication')
const { canViewCommercesInfo } = require('../../permissions/commerces.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/commerce', router)

  router.get('/', authentication, canViewCommercesInfo(['LIST-ALL SALES', 'LIST-PARTIAL SALES']), async (req, res) => {
    const { commmerces, message, success } = await commerceController.list(req.filter)
    if (success) {
      res.json({ commmerces, success, message }).status(200)
    } else {
      res.send(message)
      return res.sendStatus(401)
    }
  })

  router.post('/', authentication, async (req, res) => {
    const data = {
      DESCRIPTION: req.body.DESCRIPTION,
      NUMBER_PHONE: req.body.NUMBER_PHONE,
      ZIP_CODE: req.body.ZIP_CODE,
      LENGTH: req.body.LENGTH,
      LATITUDE: req.body.LATITUDE
    }
    const { commerce, message, success } = await commerceController.create(data)
    if (success) {
      res.json({ commerce, success, message }).status(201)
    } else {
      res.json({ message, success })
    }
  })

  router.put('/:id', authentication, async (req, res) => {
    const data = {
      DESCRIPTION: req.body.DESCRIPTION,
      NUMBER_PHONE: req.body.NUMBER_PHONE,
      ZIP_CODE: req.body.ZIP_CODE,
      LENGTH: req.body.LENGTH,
      LATITUDE: req.body.LATITUDE
    }
    const IDCOMMERCE = req.params.id
    const { commerce, success, message } = await commerceController.update(data, IDCOMMERCE)
    if (success) {
      res.json({ commerce, success, message }).status(204)
    } else {
      res.json({ message, success })
    }
  })
}
