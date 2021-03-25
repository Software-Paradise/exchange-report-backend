const puppeteer = require('puppeteer')
const {readFileSync} = require('fs')
const {generateTemplate} = require('../config/template.config')
const {pdfConfig} = require('../config/index')
const path = require('path')

const pathErrorTemplate = path.resolve('./templates', 'errorTemplate.hbs');

/**
 * @module pdfController - controlador para generacion de archivos pdf por medio de plantillas de Handlebars
 */
const pdfController = {
    
    /**
     * 
     * @param {string} pathTemplate - Ruta del template que se va convertir en pdf
     * @param {Object} context - Props que se pueden reemplazar dentro de la plantilla si esta lo amerita
     * @returns 
     */
    generatePDF: async (pathTemplate, context) =>{
        try {
            let templateStr;
            if(pathTemplate) templateStr = readFileSync(pathTemplate).toString('utf8')
            else templateStr = readFileSync(pathErrorTemplate).toString('utf8')
 
            const {html} = generateTemplate(templateStr, {context})
            
            let config = pdfConfig.letter()
            
            try {
                const browser = await puppeteer.launch({headless: true});
                const page = await browser.newPage();
                await page.setContent(html);
                await page.setViewport(pdfConfig.viewPort());
                await page.pdf(config);
                await browser.close();
                return ({success: true, message: 'pdf generado', name: config.path})
            } catch (error) {
                console.log(error)
                return ({success: false, message: 'No se logro generar el pdf'})
            }   

        } catch (error) {
            return ({success: false, message: 'No se encontro la plantilla HTML'})
        }
    }
}


module.exports = pdfController;