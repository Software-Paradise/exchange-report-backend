const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')

/**
 * @module usersInfoController Controlador de Informacion de Usuarios Registrados
 */
const usersInfoController = {
  list: async (req, res) => {
    const filter = req.filter || {}
    try {
      const database = await initDataBase(sequelizeConfig)
      console.time('filterquery')
      const users = await database.user.findAll({
        where: filter,
        raw: false,
        include: [
          {
            model: database.agent_info,
            attributes: { exclude: ['FK_USER'] }
          },
          {
            model: database.commerce,
            attributes: { exclude: ['IDCOMMERCE'] }
          },
          {
            model: database.profile,
            attributes: { exclude: ['IDPROFILE'] }
          },
          {
            model: database.agent_wallet,
            attributes: { exclude: ['FK_USER'] }
          }
        ]
      })
      console.timeEnd()
      return res.json({ users, success: true, message: 'is ok' }).status(200)
    } catch (error) {
      return res.json({ success: false, message: 'something wrong' }).status(404)
    }
  }
}

module.exports = usersInfoController
