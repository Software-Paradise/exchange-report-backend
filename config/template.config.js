const handlebars = require("handlebars");

/**
 * Configuracion para el compilador de plantillas Handlebars
 */
const getHtml = {

    /**
     * 
     * @param {hbs} template Plantilla que se va compilar
     * @param {Object} context Contexto que se va inyectar en la plantilla
     * @returns {Html} Plantilla procesada
     */
    generateTemplate: (template="", context={})=>{
        let tmpl = handlebars.compile(template);
        let html = tmpl(context);
        return ({html})
    }
}

module.exports = getHtml;