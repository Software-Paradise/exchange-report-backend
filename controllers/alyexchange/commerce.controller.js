const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')
const { paramsValidator } = require('../../validators/general.validator')

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
  findAll: async (req, res) => {
    console.time('medicion')
    const filter = req.filter || {}
    try {
      const database = await initDataBase(sequelizeConfig)
      const commmerces = await database.commerce.findAll({
        include: [
          {
            model: database.bo_user,
            attributes: [
              'IDUSER', 'PHOTO', 'EMAIL', 'COMISSION'
            ],
            where: filter,
            include: [
              {
                model: database.profile,
                attributes: [
                  'PROFILE'
                ]
              }
            ]
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
      return res.json({ commerce: newCommerce, success: true, message: 'record created successfully ' }).status(201)
    } catch (error) {
      return res.json({ success: false, message: true }).status(400)
    }
  },

  /**
   *
   * @param {*} req | Request Http route
   * @param {*} res | Response Http route
   * @returns
   */
  update: async (req, res) => {
    if (paramsValidator(req.params)) {
      const { id } = req.params
      const { commerce } = req.body
      try {
        const database = await initDataBase(sequelizeConfig)
        const mycommerce = await database.commerce.update(commerce, { where: { IDCOMMERCE: id } })
        return res.json({ commerce: mycommerce, success: true, message: 'record updated successfully' }).status(200)
      } catch (error) {
        return res.json({ success: false, message: 'update failed' }).json(400)
      }
    } else {
      res.json({ success: false, message: 'Paramns not found ' }).status(400)
    }
  }
}

module.exports = commerceController
