const { pdfConfig } = require('../config/index')
const puppeteer = require('puppeteer')

module.exports = {
  invitationHtmlToPdf: async (html) => {
    const config = pdfConfig.invitation()
    try {
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()
      await page.setContent(html)
      await page.setViewport(pdfConfig.viewPort2())
      await page.pdf(config)
      await browser.close()
      return ({ success: true, message: 'successfully generated pdf ', name: config.path })
    } catch (error) {
      console.log(error)
      return ({ success: false, message: 'Could not generate pdf file' })
    }
  }
}
