const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module representative Controlador de Informacion del representante commercial
 */
const representativeInfo = {
  create: async (data) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const representative = await database.commerce_representative_info.create(data)
      return ({ representative, success: true, message: 'ok' })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}

module.exports = representativeInfo
