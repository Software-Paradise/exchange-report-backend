const fs = require('fs')
const path = require('path')
const base64img = require('../utils/base64')
const handlebars = require('handlebars')

function hbsCompile (context = {}, name) {
  const pathTemplate = path.resolve('./templates', name)
  const templateStr = fs.readFileSync(pathTemplate).toString('utf8')
  const tmpl = handlebars.compile(templateStr)
  const html = tmpl(context)
  return ({ html })
}

module.exports = {
  generateInvitationHtml: (context = {}, name) => {
    const pngpath1 = path.resolve('./assets', 'POWERED.png')
    const pngpath2 = path.resolve('./assets', 'ALYEXCHANGE.png')
    context.PNG1 = base64img.base64Sync(pngpath1)
    context.PNG2 = base64img.base64Sync(pngpath2)
    return hbsCompile(context, name)
  }
}
