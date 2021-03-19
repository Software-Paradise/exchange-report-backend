const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')
const log = require("../logs/index")
const { MAILGUN_APIKEY, MAILGUN_DOMAIN } = require("./vars.config")
​
/**CREAR TRASNPORT*/
const transporter = nodemailer.createTransport(mailgun({
    auth: {
        api_key: MAILGUN_APIKEY,
        domain: MAILGUN_DOMAIN
    }
}))
​
/**
 * Metodo para envio de correo generico
 * 
 * @param {Object} config
 */
const send = (from = "", to = "", subject = "", html = "") => {
    return new Promise( async (resolve, reject)=>{
        try {
            transporter.sendMail({ from, to, subject, html }, (err, info) => {
                if (err) {
                    reject(err.message)
                }
    ​
                resolve(info)
            })
        } catch (error) {
            log(`send-email.config.js | ${error}`)
        }
    })
}

module.exports = { send }