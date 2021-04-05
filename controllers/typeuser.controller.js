const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module typeuserController Controlador de tipos de usuario
 */
const typeuserController = {
  list: async () => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const typesUser = await database.type_user.findAll({ raw: true })
      return ({ typesUser, success: true })
    } catch (error) {
      return ({ success: false })
    }
  }
}

module.exports = typeuserController
