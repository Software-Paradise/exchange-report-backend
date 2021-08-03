const vars = require('./vars.config')
const db = require('./db.alyexchange.config')
const constants = require('./constants.config')
const pdfConfig = require('./pdf.config')
const emailConfig = require('./email.config')
const sequelizeConfig = require('./sequelize.config')

module.exports = {
  vars,
  db,
  constants,
  pdfConfig,
  emailConfig,
  sequelizeConfig
}
