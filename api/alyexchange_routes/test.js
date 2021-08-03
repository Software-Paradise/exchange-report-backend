const router = require('express').Router()
const pkg = require('../../package.json')
const { CLIENT_URL } = require('../../config/vars.config')
const mailService = require('../../services/mail.service')
const { loadMigrate, resetTables } = require('../../migrations/index')
const coinController = require('../../controllers/alyexchange/coin.controller')
const countryController = require('../../controllers/alyexchange/country.controller')

/**
 * @module testRoutes test Router
 * @param {*} app - Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
  app.set('pkg', pkg)
  app.use(prefix, router)

  const data = {
    from: 'test@alyexchange.com',
    to: 'alekzander86@hotmail.es',
    subject: 'correo de prueba de envio de adjunto',
    FULLNAME: 'Lucas Andres Marsell Rocha',
    EMAIL: 'alekzander86@hotmail.es',
    PASSWORD: 'losamoresdel*',
    URL: `${CLIENT_URL}/alyexchange/login`,
    COMMERCE: 'LOS AMORES DEL ARTE',
    USERADMIN: 'GABRIEL GARCIA MARQUEZ'
  }

  /**
     * Ruta de prueba de autenticacion de token de usaurio
     * @route {GET} /test/index
     * @authentication Requiere Middleware de autenticacion
     *
    */
  router.get('/index', async (req, res) => {
    res.json({
      success: true,
      name: app.get('pkg').name,
      description: app.get('pkg').description,
      version: app.get('pkg').version
    })
  })

  router.get('/send/pdf', async (_, res) => {
    const { success, message } = await mailService.sendInvitationPDF(data)
    if (success) {
      res.json({ success, message }).status(200)
    } else {
      res.json({ success }).status(404)
    }
    // res.writeHead(200, { 'Content-Type': 'image/png' })
    // res.end(image, 'binary')
  })

  router.get('/send/img', async (_, res) => {
    const { success, message } = await mailService.sendInvitationIMG(data)
    if (success) {
      res.json({ success, message }).status(200)
    } else {
      res.json({ success }).status(404)
    }
  })

  router.get('/reset/table', async (_, res) => {
    const { success, message } = await resetTables.reset()
    if (success) {
      res.json({ success, message })
    } else res.json({ success, message })
  })

  router.get('/load/table', async (_, res) => {
    const { success, message } = await loadMigrate.load()
    if (success) {
      res.json({ success, message })
    } else res.json({ success, message })
  })

  router.get('/countries', countryController.create)

  router.get('/coins', coinController.create)
}
