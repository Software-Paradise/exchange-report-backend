const { generateTemplate } = require('../config/template.config')
// const log = require('../logs/index')
const email = require('../config/email.config')
const path = require('path')
const fs = require('fs')
const imageController = require('./image.controller')
const { readFileSync } = require('fs')
const htmlService = require('../services/html.service')
const pdfService = require('../services/pdf.service')
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

  emailIMGAttachment: async (data, name) => {
    const { status } = await imageController.imgForLogin(data)
    const emailData = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: `<div>
      <p>Revise las credenciales de inicio de sesion en la imagen adjunta</p>
        <a href="http://www.test.com">Haga clic para iniciar sesion en AlyExchange</a>
      </div>`,
      attachments: [
        {
          filename: `${name}`,
          path: path.resolve('./', `${name}`),
          contentType: 'image/png'
        }
      ]
    }

    if (status) {
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
  },

  sendInvitation: async (data) => {
    const { html } = htmlService.generateInvitationHtml(data)
    const { success, name } = await pdfService.invitationHtmlToPdf(html)

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
          return ({ success: false, message: 'the email has been sent, but the file could not be removed from the server ' })
        }
      } catch (error) {
        console.log(error)
        // log(`send-email.config.js | ${error}`)
        return ({ success: false, message: 'The email can not be sent' })
      }
    } else {
      return ({ success: false, message: 'Attachment can not be generated ' })
    }
  }
}

module.exports = sendMailController
