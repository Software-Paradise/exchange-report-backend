const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

function hbsCompile (context = {}, name) {
  const pathTemplate = path.resolve('./templates', name)
  const templateStr = fs.readFileSync(pathTemplate).toString('utf8')
  const tmpl = handlebars.compile(templateStr, { strict: true })
  const html = tmpl(context)
  return ({ html })
}

module.exports = {
  generateHTML: (context, name) => {
    return hbsCompile(context, name)
  }
}
