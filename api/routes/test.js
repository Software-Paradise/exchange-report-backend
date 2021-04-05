const router = require('express').Router()
const { sendMailController } = require('../../controllers/index')
const pkg = require('../../package.json')
const { pdfController } = require('../../controllers/index')
const path = require('path')
const { generateTemplate } = require('../../config/template.config')
const { readFileSync } = require('fs')
/**
 * @module testRoutes test Router
 * @param {*} app - Instancia del Framework de Express
 */
module.exports = (app) => {
  app.set('pkg', pkg)
  app.use('/test', router)

  /**
     * Ruta de prueba de autenticacion de token de usaurio
     * @route {GET} /test/index
     * @authentication Requiere Middleware de autenticacion
     *
    */
  router.get('/index', async (_, res) => {
    res.json({ success: true, name: app.get('pkg').name, description: app.get('pkg').description, version: app.get('pkg').version })
  })

  /**
     * Ruta de prueba de envio de correos a la cuenta de un usuario
     * @route {GET} /test/sendmail
     * @authentication Requiere Middleware de autenticacion
     *
    */
  router.get('/sendmail', async (_, res) => {
    const data = {
      from: 'admin@alyexchange.com',
      to: 'alekzander86@hotmail.es',
      subject: 'Bienvenido a Alyexchange'
    }
    const pathTemplate = path.resolve('./templates', 'testTemplate.hbs')
    const { success, message, info } = await sendMailController.generateEmail(pathTemplate, data, {})
    if (success) {
      res.json({ success, message, info }).status(200)
    } else {
      res.json({ success, message }).status(401)
    }
  })

  /**
     * Ruta de prueba del enlace que se envio al correo del usuario
     * @route {GET} /test/saludar
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     *
    */
  router.get('/saludar', (_, res) => {
    res.json({ message: 'todo esta correcto' })
  })

  /**
     * Ruta de prueba para generacion de archivos pdf
     * @route {GET} /test/generate/pdf
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     *
    */
  router.get('/generate/pdf', async (_, res) => {
    const pathTemplate = path.resolve('./templates', 'testTemplate.hbs')

    const { success, message } = await pdfController.generatePDF(pathTemplate, {})
    if (success) {
      res.json({ message }).status(200)
    } else res.json({ message }).status(400)
  })

  /**
     * Ruta de prueba para generacion y envio de archivos pdf
     * @route {GET} /test/sendmail/pdf
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     *
    */
  router.get('/sendmail/pdf', async (_, res) => {
    const data = {
      from: 'test@alyexchange.com',
      to: 'alekzander86@hotmail.es',
      subject: 'correo de prueba de envio de adjunto'
    }

    const pathTemplate = path.resolve('./templates', 'testTemplate.hbs')

    const { success, message } = await sendMailController.emailPDFAttachment(pathTemplate, data, {})

    if (success) res.json({ message, success }).status(200)
    else res.json({ message, success }).status(400)
  })

  router.get('/template', (_, res) => {
    const pathTemplate = path.resolve('./templates', 'newUserTemplate.hbs')
    const templateStr = readFileSync(pathTemplate).toString('utf8')
    const data = {
      FULLNAME: 'Lucas Andres Marsell',
      EMAIL: 'alekzander86@hotmail.es',
      PASSWORD: 'lamisma123*'
    }
    const { html } = generateTemplate(templateStr, data)
    res.send(html)
  })
}
