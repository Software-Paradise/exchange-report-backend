const { EventEmitter } = require('events')
​
// import html and sendMial config
const {generate } = require('../config/html.config')
const email = require('../config/email.config')
// ​
// import log
const log = require('../logs/log.config')
​
// create event emiter instane for dispatch mailer job
const MailerEvent = new EventEmitter()
​
/**
 * Task to render a template and delivery email
 * @param {String} from - email origin
 * @param {String} to - email target
 * @param {String} subject - email subject
 * @param {String} template - filename of template to render
 * @param {Object} data - data needed for render template
 */
async function sendEmailCallback({ from, to, subject, template, data = {} }) {
    try {
        // get html content
        //const {success, message, html} = await generate(template)
        const html = await getHTML(template, data)
​
        // send email
        await email.send(from, to, subject, html)
    } catch (error) {
        log(
            `MailerJob: Error on send email to ${to} with subject: ${subject} using template: ${template} | error: ${error}`
        )
    }
}
​
// config event listener
MailerEvent.on('send', sendEmailCallback)
​
/**
 * Dispatch mailer job
 * @param {String} from
 * @param {String} to
 * @param {String} subject
 * @param {String} template
 * @param {Object} data
 */
module.exports = function (from, to, subject, template, data = {}) {
    try {
        /**
         * Check required params
         */
        if (!from) {
            throw String('Email from is required')
        }
​
        if (!to) {
            throw String('Email target is required')
        }
​
        if (!subject) {
            throw String('Email subject is required')
        }
​
        if (!template) {
            throw String('Email template is required')
        }
​
        // dispatch send email task
        MailerEvent.emit('send', {
            from,
            to,
            subject,
            template,
            data,
        })
    } catch (error) {
        log(`MailerJob: Error on start job, invalid input data: ${error}`)
    }
}