const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module usersInfoController Controlador de Informacion de Usuarios Registrados
 */
const usersInfoController = {
  list: async (req, res) => {
    const filter = req.filter || {}
    try {
      const database = await initDataBase(sequelizeConfig)
      console.time('filterquery')
      const users = await database.bo_user.findAll({
        where: filter,
        raw: false,
        include: [
          {
            model: database.bouser_info,
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
      return res.json({ users, success: true, message: 'is ok' }).status(200)
    } catch (error) {
      return res.json({ success: false, message: 'something wrong' }).status(404)
    }
  }
}

module.exports = usersInfoController
