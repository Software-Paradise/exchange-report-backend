const db = require('../models')
const typeCoinModel = db.type_coin

const typeCoinController = {
  listCoin: async () => {
    const typeCoin = await typeCoinModel.findAll({})
    if (typeCoin) {
      return ({ success: true, typeCoin })
    } else {
      return ({ success: false, message: 'Error en la consulta' })
    }
  },

  create: async (coin) => {
    try {
      const newcoin = await typeCoinModel.create(coin)
      return ({ success: true, message: 'has been created succesfully' })
    } catch (error) {
      return ({ message: `Error: ${error}`, success: false })
    }
  }
}

module.exports = typeCoinController
