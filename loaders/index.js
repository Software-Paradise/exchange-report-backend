const expressLoader = require('./express.loader')

module.exports = {
  async init ({ expressApp = null }) {
    await expressLoader(expressApp)
  }
}
