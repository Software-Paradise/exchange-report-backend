const db = require('../models')
const typeCoinModel = db.type_coin

/**
 * @module typeCoinController - controlador de tipos de cripto monedas
 */
const typeCoinController = {

  /**
   * 
   * @returns {Object} - success: estado de la consulta | typeCoin: tipos de cripto monedas
   */
  listCoin: async () => {
    const typeCoin = await typeCoinModel.findAll({})
    if (typeCoin) {
      return ({ success: true, typeCoin })
    } else {
      return ({ success: false, message: 'Error en la consulta' })
    }
  },

  /**
   * 
   * @param {Object} coin - Objeto que contiene los datos de la cripto moneda que se va registrar 
   */
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
