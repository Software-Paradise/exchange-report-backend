const seed = require('../seeders/seed')
const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models')

module.exports = {
  load: async () => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const profiles = seed.profiles()
      const modules = seed.modules()
      const portfolios = seed.portfolios()
      const permissions = seed.permissions()
      const php = seed.portfolio_has_permission()
      const commerces = seed.commerces()
      const users = seed.users()
      const agentInfo = seed.agentInfo()
      const types = seed.transaction_types()
      const status = seed.transaction_status()
      const fees = seed.fees()
      const customers = seed.customer()
      const agentWallet = seed.agent_wallet()
      const customerWallet = seed.customer_wallet()

      const migrations = [
        { obj: profiles, table: 'profile' },
        { obj: modules, table: 'modalex' },
        { obj: portfolios, table: 'portfolio' },
        { obj: permissions, table: 'permission' },
        { obj: php, table: 'portfolio_has_permission' },
        { obj: commerces, table: 'commerce' },
        { obj: users, table: 'bo_user' },
        { obj: agentInfo, table: 'agent_info' },
        { obj: types, table: 'transaction_type' },
        { obj: status, table: 'transaction_status' },
        { obj: fees, table: 'fees' },
        { obj: customers, table: 'customer' },
        { obj: agentWallet, table: 'agent_wallet' },
        { obj: customerWallet, table: 'customer_wallet' }
      ]
      setTimeout(() => {
        migrations.forEach(data => {
          const model = data.table
          data.obj.forEach(async element => {
            setTimeout(async () => {
              await database[model].create(element)
            }, 1000)
          })
        })
      }, 500)

      return ({ success: true })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}
