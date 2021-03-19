const expressLoader = require('./express.loader')
const sequelizeLoader = require('./sequelize.loader')

module.exports = {
    async init(expressApp = null ) {
        await expressLoader(expressApp)
    },
}
