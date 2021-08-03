const { QueryTypes } = require('sequelize')
const { getPermissions } = require('../../queries/permission.queries')
const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')

module.exports = {
  /**
   *
   * @param {*} IDBO_USER | Id del usuario que inicio sesion
   * @param {*} MODULE    | Nombre del Modulo
   * @returns
   */
  verifyPermission: async (IDBO_USER, MODULE) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const response = await database.sequelize.query(getPermissions(),
        { replacements: { iduser: IDUSER, module: MODULE }, type: QueryTypes.SELECT })
      return response[0].PERMISSION.split(',')
    } catch (error) {
      return []
    }
  }
}
