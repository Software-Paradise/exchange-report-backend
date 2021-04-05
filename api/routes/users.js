const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const { usersInfoController } = require('../../controllers/index')
const { canViewUsersInfo } = require('../../permissions/users.permission')
/**
 *
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app) => {
  app.use('/users', router)

  router.get('/', authentication, canViewUsersInfo(['LIST-ALL AUTH', 'LIST-PARTIAL AUTH']), async (req, res) => {
    const { success, message, users } = await usersInfoController.list(req.filter)
    if (success) {
      return res.status(200).json({ success, message, users })
    } else {
      return res.status(401).json({ message, success })
    }
  })
}
