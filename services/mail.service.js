const htmlService = require('./html.service')
const pdfService = require('./pdf.service')
const imageService = require('./image.service')
const path = require('path')
const email = require('../config/email.config')
const fs = require('fs')

module.exports = {
  sendInvitationPDF: async (data) => {
    const { html } = htmlService.generateInvitationHtml(data, 'invitationPDF.hbs')
    const { success, name } = await pdfService.invitationHtmlToPdf(html)

    const emailData = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: `
      <div>
        <p>Para poder iniciar sesion, revisa tus credenciales en el archivo adjunto</p>
        br
        <a href='http://wwww.alysystem.com/alyexchange'>Clic para iniciar sesion en AlyExchange Reports</a>
      </div>
      `,
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
  },

  sendInvitationIMG: async (data) => {
    const { html } = htmlService.generateInvitationHtml(data, 'invitationIMG.hbs')
    const { success, name } = await imageService.invitationHtmlToPNG(html)

    const emailData = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: `
        <div>
          <p>Para poder iniciar sesion, revisa tus credenciales en la imagen adjunta</p>
          br
          <a href='http://wwww.alysystem.com/alyexchange'>Clic para iniciar sesion en AlyExchange Reports</a>
        </div>
      `,
      attachments: [
        {
          filename: `${name}`,
          path: path.resolve('./', `${name}`),
          contentType: 'image/png'
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
