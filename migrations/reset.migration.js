const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models')
const { resetIndexTable } = require('../queries/resetindex.queries')
const { DB } = require('../config/vars.config')

module.exports = {
  reset: async () => {
    try {
      const database = await initDataBase(sequelizeConfig)

      const TABLENAMES = [
        'transaction_info', 'transaction', 'agent_wallet', 'customer_wallet', 'agent_info', 'bo_user', 'customer',
        'customer', 'portfolio_has_permission', 'portfolio', 'profile', 'modalex',
        'permission', 'commerce', 'transaction_type', 'transaction_status', 'fees'
      ]

      TABLENAMES.forEach(table => {
        setTimeout(async () => {
          try {
            await database.sequelize.query(resetIndexTable(DB.NAME, table))
          } catch (error) {
            return ({ success: false, message: error })
          }
        }, 1000)
      })

      return ({ success: true })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}
