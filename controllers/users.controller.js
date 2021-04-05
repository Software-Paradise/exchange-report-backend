const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module usersInfoController Controlador de Informacion de Usuarios Registrados
 */
const usersInfoController = {
  list: async (filter = { }) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      console.time('filterquery')
      const users = await database.bo_user.findAll({
        where: filter,
        raw: false,
        include: [
          {
            model: database.commerce_representative_info,
            attributes: { exclude: ['FK_BO_USER'] }
          },
          {
            model: database.commerce,
            attributes: { exclude: ['IDCOMMERCE'] }
          },
          {
            model: database.profile,
            attributes: { exclude: ['IDPROFILE'] }
          }
        ]
      })
      console.timeEnd('filterquery')
      return ({ users, success: true, message: 'is ok' })
    } catch (error) {
      return ({ success: false, message: 'something wrong' })
    }
  }
}

module.exports = usersInfoController
