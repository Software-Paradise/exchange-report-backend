const db = require('../models')
const walletModel = db.wallet
const userModel = db.users
const typeCoindModel = db.type_coin


/**
 * @module walletController - - controlador de billeteras de usuario
 */
const walletController = {
  
  /**
   * 
   * @returns {Array} Retorna un arreglo con todos los Wallets
   * @return {boolean} Retorna el estado de la solicitud al controlador
   * @return {string} Retorna un mensaje
   */
  listWallets: async () => {

    try { 
      const wallets = await walletModel.findAll({
        include: [
          {
            model: userModel,
            attributes: { exclude: ["id_user", "password", "reset_password"] },
          },
          {
            model: typeCoindModel,
            attributes: { exclude: ["id_coin", "date_create", "date_modification", "date_disable"] },
          },
        ],
      })
      return ({ success: true, wallets })
    } catch (error) {
      return ({ success: false, message: `Error: ${error}` })
    }

  },

  /**
   * 
   * @param {Object} wallet Objeto que contiene los datos del wallet que se va registrar
   * @returns {boolean} Retorna el estado de la solicitud al controlador
   * @returns {string} Retorna un mensaje
   */
  create: async (wallet) => {
    
    try {
      const newWallet = await walletModel.create(wallet);
      return ({ success: true, message: 'created successfully', newWallet })
    } catch (error) {
      return ({ success: true, message: `Error: ${error}` })
    }
  
  }
}

module.exports = walletController
