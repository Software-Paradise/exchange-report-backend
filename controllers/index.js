const sendMailController = require('./sendmail.controller')
const pdfController = require('./pdf.controller')
const commerceController = require('./commerce.controller')
const authController = require('./auth.controller')
const typeuserController = require('./typeuser.controller')
const usersInfoController = require('./users.controller')
const permissionsController = require('./permissions.controller')

module.exports = {
  sendMailController,
  pdfController,
  commerceController,
  authController,
  typeuserController,
  usersInfoController,
  permissionsController
}
