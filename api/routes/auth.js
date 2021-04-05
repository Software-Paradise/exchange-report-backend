const { authController, sendMailController } = require('../../controllers/index')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()
const path = require('path')
const { CLIENT_URL } = require('../../config/vars.config')

/**
 *
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (app) => {
  app.use('/auth', router)

  router.post('/register', authentication, async (req, res) => {
    const newUser = {
      EMAIL: req.body.email,
      PASSWORD: req.body.password,
      FK_COMMERCE: req.body.idcommerce,
      FK_PROFILE: req.body.idprofile,
      FULLNAME: req.body.fullname,
      POSITION: req.body.position,
      URL: `${CLIENT_URL}/alyexchange/login`
    }
    const { success, message } = await authController.register(newUser)
    if (success) {
      const pathTemplate = path.resolve('./templates', 'newUserTemplate.hbs')
      const data = {
        from: 'admin@alyexchange.com',
        to: newUser.EMAIL,
        subject: 'Bienvenido a Alyexchange'
      }
      const { success, message } = await sendMailController.generateEmail(pathTemplate, data, newUser)
      if (success) {
        res.json({ success, message }).status(201)
      } else {
        res.json({ message, success }).status(401)
      }
    } else {
      res.json({ message, success }).status(401)
    }
  })

  router.post('/login', async (req, res) => {
    const credentials = {
      EMAIL: req.body.email,
      PASSWORD: req.body.password
    }
    const { success, message, user, token } = await authController.login(credentials)
    if (success) {
      res.json({ success, user, token }).status(200)
    } else {
      res.json({ success, message }).status(401)
    }
  })
}
