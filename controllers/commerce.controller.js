const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')

/**
 * @module commerceController Controlador de commercios
 */
const commerceController = {
  /**
   *
   * @param {*} req | Request Http route
   * @param {*} res | Response Http route
   * @returns
   */
  list: async (req, res) => {
    console.time('medicion')
    const filter = req.filter || {}
    try {
      const database = await initDataBase(sequelizeConfig)
      const commmerces = await database.commerce.findAll({
        // group: ['IDCOMMERCE'],
        // required: false,
        include: [
          {
          // group: ['IDBO_USER'],
            model: database.bo_user,
            attributes: { exclude: ['PASSWORD', 'CREATED_AT', 'UPDATED_AT', 'DISABLED_AT'] },
            where: filter
          }
        ]
      })
      console.timeEnd('medicion')
      return res.json({ commmerces, success: true, message: 'ok' }).status(200)
    } catch (error) {
      return res.json({ success: false, message: error }).status(404)
    }
  },

  /**
   *
   * @param {*} req | Request Http route
   * @param {*} res | Response Http route
   * @returns
   */
  create: async (req, res) => {
    const { commerce } = req.body
    try {
      const database = await initDataBase(sequelizeConfig)
      const newCommerce = await database.commerce.create(commerce)
      return res.json({ commerce: newCommerce, success: true, message: 'record created successfully ' }).status(204)
    } catch (error) {
      return res.json({ success: false, message: true }).status(404)
    }
  },

  /**
   *
   * @param {*} req | Request Http route
   * @param {*} res | Response Http route
   * @returns
   */
  update: async (req, res) => {
    const { id } = req.params
    const { commerce } = req.body
    try {
      const database = await initDataBase(sequelizeConfig)
      const mycommerce = await database.commerce.update(commerce, { where: { IDCOMMERCE: id } })
      return res.json({ commerce: mycommerce, success: true, message: 'record updated successfully' }).status(204)
    } catch (error) {
      return res.json({ success: false, message: 'update failed' }).json(404)
    }
  }
}

module.exports = commerceController
