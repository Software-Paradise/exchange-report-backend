const nodeHtmlToImage = require('node-html-to-image')
module.exports = {
  invitationHtmlToPNG: async (html) => {
    const name = `IN${new Date().getTime()}.png`
    try {
      await nodeHtmlToImage({ output: `./${name}`, html })
      return ({ success: true, name })
    } catch (error) {
      return ({ success: false, message: error })
    }
  }
}
