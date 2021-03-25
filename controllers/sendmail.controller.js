const {generateTemplate} = require('../config/template.config')
const log = require("../logs/index");
const email = require('../config/email.config')
const path = require('path')

const pathErrorTemplate = path.resolve('./templates', 'errorTemplate.hbs');

/**
 * @module sendMailController - controlador de envio de correos a usuarios
 */
const sendMailController = {
    
    /**
     * @param {Object} data - Objeto { destinatario | remitente | asunto } del Correo - { path | contexto }  del template que se va emplear en el envio
     * @returns {string} Mensaje
     * @returns {boolean} estado del proceso 
     */
    generateEmail : async ({data, pathTemplate, context})=>{
        
        let templateStr;
            if(pathTemplate) templateStr = readFileSync(pathTemplate).toString('utf8')
            else templateStr = readFileSync(pathErrorTemplate).toString('utf8')

        const {from, to, subject} = data;
        
        const {html} = generateTemplate(templateStr, {context})
            
        let emailData = {
            from,
            to,
            subject,
            html
        }

        try {
           let info = await email.sendMail(emailData);
           return ({success: true, message: `Mensaje enviado`, info});
        } catch (error) {
            log(`send-email.config.js | ${error}`)
            return ({success: false, message: error})
        }
    }
}

module.exports = sendMailController;