const {emailTemplate} = require('../config/template.config')
const {test} = require('../templates/mail.templates');
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')
const log = require("../logs/index");
const { MAILGUN_APIKEY, MAILGUN_DOMAIN, EMAIL } = require("../config/vars.config")

/**CREAR TRASNPORT*/
const transporter = nodemailer.createTransport(mailgun({
    auth: {
        api_key: MAILGUN_APIKEY,
        domain: MAILGUN_DOMAIN
    }
}))

const sendMailController = {
    sendMailTest : async ()=>{
        const {html} =  emailTemplate(test(), {name: 'Lucas Andres Marsell', url: `${EMAIL.API_URL}/api/test/saludar`})
            
        let emailData = {
            from: EMAIL.EMAIL_FROM,
            to: EMAIL.EMAIL_TO,
            subject: EMAIL.SUBJECT,
            html
        }

        try {
           let info = await transporter.sendMail(emailData);
           return ({success: true, message: `Mensaje enviado`, info});
        } catch (error) {
            log(`send-email.config.js | ${error}`)
            return ({success: false, message: error})
        }
    }
}

module.exports = sendMailController;