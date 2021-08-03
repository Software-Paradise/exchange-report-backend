const seed = require('../seeders/seed')
const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../alyexchange_models')

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
      const executives = seed.executiveInfo()
      const types = seed.transaction_types()
      const status = seed.transaction_status()
      const fees = seed.fee()
      const customers = seed.customer()
      const enterpriseWallet = seed.enterprise_wallet()
      const customerWallet = seed.customer_wallet()
      const transactions = seed.transactions()
      const transinfo = seed.transaction_info()

      const migrations = [
        { obj: profiles, table: 'profile' },
        { obj: modules, table: 'modalex' },
        { obj: portfolios, table: 'portfolio' },
        { obj: permissions, table: 'permission' },
        { obj: php, table: 'portfolio_has_permission' },
        { obj: commerces, table: 'commerce' },
        { obj: users, table: 'user' },
        { obj: executives, table: 'executive_info' },
        { obj: types, table: 'transaction_type' },
        { obj: status, table: 'transaction_status' },
        { obj: fees, table: 'fee' },
        { obj: customers, table: 'customer' },
        { obj: enterpriseWallet, table: 'enterprise_wallet' },
        { obj: customerWallet, table: 'customer_wallet' },
        { obj: transactions, table: 'transaction' },
        { obj: transinfo, table: 'transaction_info' }
      ]
      setTimeout(() => {
        migrations.forEach(data => {
          const model = data.table
          data.obj.forEach(async element => {
            await database[model].create(element)
            // setTimeout(async () => {
            //   await database[model].create(element)
            // }, 1000)
          })
        })
      }, 500)

      return ({ success: true })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}
