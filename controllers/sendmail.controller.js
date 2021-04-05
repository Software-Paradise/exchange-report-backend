const { generateTemplate } = require('../config/template.config')
// const log = require('../logs/index')
const email = require('../config/email.config')
const path = require('path')
const fs = require('fs')
const pdfController = require('./pdf.controller')
const { readFileSync } = require('fs')

/**
 * @module sendMailController - controlador de envio de correos a usuarios
 */
const sendMailController = {

  /**
   *
   * @param {*} pathTemplate Ruta del template
   * @param {*} data Cabezera para el envio del correo
   * @param {*} context Contexto que va ser inyectado en el template
   * @returns
   */
  generateEmail: async (pathTemplate, data, context = {}) => {
    try {
      const templateStr = readFileSync(pathTemplate).toString('utf8')
      const { from, to, subject } = data
      const { html } = generateTemplate(templateStr, context)
      const emailData = {
        from,
        to,
        subject,
        html
      }

      await email.sendMail(emailData)
      return ({ success: true, message: 'Email has been sended' })
    } catch (error) {
      return ({ success: false, message: error })
    }
  },

  /**
     *
     * @param {String} pathTemplate Ruta del template base para el pdf
     * @param {Object} data Cabezara para el envio del correo
     * @param {Object} context Contexto que va ser inyectado en el template
     * @returns
     */
  emailPDFAttachment: async (pathTemplate, data, context) => {
    const { success, name } = await pdfController.generatePDF(pathTemplate, context)

    const emailData = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: '<div></div>',
      attachments: [
        {
          filename: `${name}`,
          path: path.resolve('./', `${name}`),
          contentType: 'application/pdf'
        }
      ]
    }

    if (success) {
      try {
        await email.sendMail(emailData)

        try {
          fs.unlinkSync(path.resolve('./', `${name}`))
          return ({ success: true })
        } catch (error) {
          return ({ success: false, message: 'the mail has been sent, but the file could not be removed from the server ' })
        }
      } catch (error) {
        console.log(error)
        // log(`send-email.config.js | ${error}`)
        return ({ success: false, message: 'The email could not be sent' })
      }
    } else {
      return ({ success: false, message: 'Attachment could not be generated ' })
    }
  }
}

module.exports = sendMailController
