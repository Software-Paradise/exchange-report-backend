const coinsController = require('./coins.controller');
const usersController = require('./users.controller');
const walletController = require('./wallet.controller');
const sendMailController = require('./sendmail.controller');
const pdfController = require('./pdf.controller')

module.exports = {
    coinsController,
    usersController,
    walletController,
    sendMailController,
    pdfController
}