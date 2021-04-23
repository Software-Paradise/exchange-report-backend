const htmlService = require('./html.service')
const pdfService = require('./pdf.service')
const imageService = require('./image.service')
const path = require('path')
const email = require('../config/email.config')
const fs = require('fs')

module.exports = {

  sendInvoice: async (data) => {
    const { context, headers } = data
    const { html } = htmlService.generateHTML(context, 'comprobante.hbs')
    const { success, name } = await pdfService.invoiceHtmlToPdf(html)

    const emailData = {
      from: headers.from,
      to: headers.to,
      subject: headers.subject,
      html: `
      <div>
      
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
          return ({ success: false, message: 'the mail has been sent, but the file was not removed from the server ' })
        }
      } catch (error) {
        console.log(error)
        // log(`send-email.config.js | ${error}`)
        return ({ success: false, message: 'The email was not sent' })
      }
    } else {
      return ({ success: false, message: 'Attachment was not generated ' })
    }
  },

  sendInvitationPDF: async (data) => {
    const { html } = htmlService.generateHTML(data, 'invitationPDF.hbs')
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
          return ({ success: false, message: 'the mail has been sent, but the file was not removed from the server ' })
        }
      } catch (error) {
        console.log(error)
        // log(`send-email.config.js | ${error}`)
        return ({ success: false, message: 'The email was not sent' })
      }
    } else {
      return ({ success: false, message: 'Attachment was not generated' })
    }
  },

  sendInvitationIMG: async (data) => {
    const { html } = htmlService.generateHTML(data, 'invitationIMG.hbs')
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
          return ({ success: false, message: 'the mail has been sent, but the file was not removed from the server ' })
        }
      } catch (error) {
        console.log(error)
        // log(`send-email.config.js | ${error}`)
        return ({ success: false, message: 'The email was not sent' })
      }
    } else {
      return ({ success: false, message: 'Attachment was not generated ' })
    }
  }
}
