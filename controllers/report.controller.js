const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')
const { Op } = require('sequelize')
const {sendReport} = require('../services/report.service')
const { paramsValidator } = require('../validators/general.validator')

module.exports = {
  ReportByid: async (req, res) => {
    const filter = req.filter || {}
    console.log('filter:', filter)
    if (paramsValidator(req.params)) {
      try {
        const database = await initDataBase(sequelizeConfig)
        const report = await database.transaction_history_view.findOne({
          where: {
            [Op.and]: [
              { IDTRANSACTION: req.params.id },
              filter
            ]
          },
          attributes: [
            'AGENT_FULLNAME', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY', 'CUSTOMER_EMAIL',
            'CREATED_AT', 'TRANSACTION_TYPE', 'ORIGIN_SYMBOL', 'DESTINATION_SYMBOL',
            'ORIGIN_CURRENCY', 'DESTINATION_CURRENCY', 'AMOUNT_FROM', 'AMOUNT_TO',
            'CVC_FROM', 'CVC_TO', 'BNS_COMMISSION_USD', 'BNS_COMMISSION_CRYPTO', 'EXE_USD', 'EXE_CRYPTO'
          ]
        })

        try {
          const {success, message} = await sendReport(report)
          res.json({success, message, report})
        } catch (error) {
          res.json({success: false, message: 'Something wrong'})
        }

        
      } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Something wrong' }).status(400)
      }
    }
  }
}
