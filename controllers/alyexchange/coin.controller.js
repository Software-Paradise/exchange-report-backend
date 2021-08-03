const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')
const { creteCoin } = require('../../queries/coin.queries')
const { QueryTypes } = require('sequelize')
const axios = require('axios')

/**
 * @module coinController Controlador Coin
 */
const coinController = {

  create: async (req, res) => {
    const uri = 'http://ardent-medley-272823.appspot.com/collection/prices'
    const requestOptions = {
      method: 'get',
      url: uri,
      responseType: 'json'
    }
    const { data } = await axios(requestOptions)
    const coins = Object.values(data)
    const listCoins = coins.map(item => {
      return { symbol: item.symbol, name: item.name, idcoin: item.id, price: item.quote.USD.price }
    })

    try {
      const database = await initDataBase(sequelizeConfig)
      listCoins.forEach(coin => {
        database.sequelize.query(creteCoin(),
          {
            replacements:
          {
            idcoin: coin.idcoin,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.price
          },
            type: QueryTypes.INSERT
          })
      })

      res.status(201).json({ success: true })
    } catch (error) {
      res.status(204).json({ success: false })
    }
  },

  /**
   *
   * @param {*} req | Request Http route
   * @param {*} res | Response Http route
   * @returns
   */
  update: async (req, res) => {
    const { id } = req.params
    const { commerce } = req.body
    try {
      const database = await initDataBase(sequelizeConfig)
      const mycommerce = await database.commerce.update(commerce, { where: { IDCOMMERCE: id } })
      return res.json({ commerce: mycommerce, success: true, message: 'record updated successfully' }).status(204)
    } catch (error) {
      return res.json({ success: false, message: 'update failed' }).json(404)
    }
  }
}

module.exports = coinController
