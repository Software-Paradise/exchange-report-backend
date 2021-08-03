const expressLoader = require('./express.loader')
const {initDataBase: alyexchangeLoader } = require('../alyexchange_models')
const {initDataBase: alypayLoader} = require('../alypay_models')

module.exports = {
  async init ({ expressApp = null, sequelizeConfig = [null, null] }) {
    await expressLoader(expressApp)
    await alyexchangeLoader(sequelizeConfig[0])
    await alypayLoader(sequelizeConfig[1])
  }
}
