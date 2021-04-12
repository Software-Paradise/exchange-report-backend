const seed = require('../seeders/seed')
const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')
const { resetIndexTable } = require('../queries/resetindex.queries')
const { DB } = require('../config/vars.config')

module.exports = {
  migrateSeed: async () => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const profiles = seed.profiles()
      const modules = seed.modules()
      const portfolios = seed.portfolios()
      const permissions = seed.permissions()
      const php = seed.portfolio_has_permission()
      const commerces = seed.commerces()
      const users = seed.users()
      const userInfo = seed.usersInfo()

      try {
        await database.sequelize.query(resetIndexTable(DB.NAME, 'bouser_info'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'bo_user'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'portfolio_has_permission'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'portfolio'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'profile'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'modalex'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'permission'))
        await database.sequelize.query(resetIndexTable(DB.NAME, 'commerce'))
      } catch (error) {
        return ({ success: false, message: error })
      }

      profiles.forEach(async profile => {
        await database.profile.create(profile)
      })

      modules.forEach(async module => {
        await database.modalex.create(module)
      })

      portfolios.forEach(async portfolio => {
        await database.portfolio.create(portfolio)
      })

      permissions.forEach(async permission => {
        await database.permission.create(permission)
      })

      php.forEach(async e => {
        await database.portfolio_has_permission.create(e)
      })

      commerces.forEach(async commerce => {
        await database.commerce.create(commerce)
      })

      users.forEach(async user => {
        await database.bo_user.create(user)
      })

      userInfo.forEach(async info => {
        await database.bouser_info.create(info)
      })

      return ({ success: true })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}
