const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')
const { paramsValidator } = require('../validators/general.validator')

const { Op } = require('sequelize')

module.exports = {

  findOne: async (req, res) => {
    if (paramsValidator(req.params)) {
      try {
        const database = await initDataBase(sequelizeConfig)
        const customers = await database.customer.findOne({
          where: {
            [Op.and]: [
              { IDCUSTOMER: req.params.id }
            ]
          },
          attributes: ['IDCUSTOMER', 'DNI', 'FULLNAME', 'EMAIL'],
          include: [
            {
              model: database.customer_info_kyc
            }
          ]
        })

        return res.json({ success: true, message: 'Ok', customers: customers || {} })
      } catch (error) {
        return res.json({ success: false, message: error }).status(400)
      }
    } else {
      return res.json({ success: false, message: 'Not params has found' })
    }
  },

  findAll: async (_, res) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const customers = await database.customer.findAll({
        attributes: ['IDCUSTOMER', 'DNI', 'FULLNAME', 'EMAIL']
      })

      return res.json({ success: true, message: 'Ok', customers: customers || {} })
    } catch (error) {
      return res.json({ success: false, message: error }).status(400)
    }
  }
}
