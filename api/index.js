const alyexchangeRouter = require('./alyexchange_routes/index')
const alypayRouter = require('./alypay_routes/index')

const routes = {
    
    alyexchange: alyexchangeRouter(),
    alypay: alypayRouter(),

}

module.exports = routes