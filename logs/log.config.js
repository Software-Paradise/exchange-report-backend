const { NOW } = require("../config/constants.config")

const logFilePath = './logs/logs.log'

const log = require('simple-node-logger').createSimpleLogger({ logFilePath })

/**Register new message to log archive */
module.exports = (errStr = '', type = 'error') => {
    log.log(type, `${NOW()} | ${errStr}`)
}