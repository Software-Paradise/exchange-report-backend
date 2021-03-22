const handlebars = require("handlebars");

const getHtml = {
    emailTemplate: (template="", context={})=>{
        let tmpl = handlebars.compile(template);
        let html = tmpl(context);

        return ({html})

    }
}

module.exports = getHtml;