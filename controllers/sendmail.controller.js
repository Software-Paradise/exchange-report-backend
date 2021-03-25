const {generateTemplate} = require('../config/template.config')
const log = require("../logs/index");
const email = require('../config/email.config')
const path = require('path')
const fs= require('fs')
const pdfController = require('./pdf.controller')

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
    generateEmail : async ({data, pathTemplate, context={}})=>{
        
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
    },

    /**
     * 
     * @param {String} pathTemplate Ruta del template base para el pdf
     * @param {Object} data Cabezara para el envio del correo
     * @param {Object} context Contexto que va ser inyectado en el template
     * @returns 
     */
    emailPDFAttachment: async (pathTemplate, data, context)=>{
        
        const {success, name} = await pdfController.generatePDF(pathTemplate, context)
        
        let emailData = {
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

        if(success){

            try {
            
                await email.sendMail(emailData);
                
                try {
                    fs.unlinkSync(path.resolve('./', `${name}`))
                    return ({success: true});
                } catch (error) {
                    return ({success: false, message: 'El archivo fue enviado al destinatario pero no se logro borrar del servidor'})
                }
    
            } catch (error) {
                console.log(error)
                //log(`send-email.config.js | ${error}`)
                return ({success: false, message: 'No se logro enviar el correo'})
            }

        }else{
            return({success: false, message: 'No se logro generar el adjunto'})
        }
    }
}

module.exports = sendMailController;