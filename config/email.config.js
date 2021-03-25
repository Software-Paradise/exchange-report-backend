const mailgun = require('nodemailer-mailgun-transport')
const nodemailer = require('nodemailer')
const { MAILGUN_APIKEY, MAILGUN_DOMAIN } = require("./vars.config")

module.exports = nodemailer.createTransport(mailgun({
    auth: {
        api_key: MAILGUN_APIKEY,
        domain: MAILGUN_DOMAIN
    }
}))