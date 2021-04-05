const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module commerceController Controlador de commercios
 */
const commerceController = {
  list: async (filter = { }) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const commmerces = await database.commerce.findAll({
        // group: ['IDCOMMERCE'],
        // required: false,
        include: [
          {
          // group: ['IDBO_USER'],
            model: database.bo_user,
            attributes: { exclude: ['PASSWORD', 'RESETPASSLINK', 'SHOULDRESETPASS', 'CREATED_AT', 'UPDATED_AT', 'DISABLED_AT'] },
            where: filter
          },
          {
            model: database.commerce_info_kyc,
            attributes: { exclude: [''] }
          }
        ]
      })
      return ({ commmerces, success: true, message: 'ok' })
    } catch (error) {
      return ({ success: false, message: error })
    }
  },

  create: async (data) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const commerce = await database.commerce.create(data)
      return ({ commerce, success: true, message: 'record created successfully ' })
    } catch (error) {
      return ({ success: false, message: true })
    }
  },

  update: async (data, id) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const commerce = await database.commerce.update(data, { where: { IDCOMMERCE: id } })
      return ({ commerce, success: true, message: 'record updated successfully' })
    } catch (error) {
      return ({ success: false, message: 'update failed' })
    }
  }
}

module.exports = commerceController
