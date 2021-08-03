const { sequelizeConfig, constants } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')
const { createValidator } = require('../../validators/transaction.validator')
const { paramsValidator } = require('../../validators/general.validator')
const { Op } = require('sequelize')
const { sendReport } = require('../../services/report.service')
const { storageProcess } = require('../../queries/transactions.queries')


const findAll = async (req, res) => {
  const filter = req.filter || {}
  try {
    const database = await initDataBase(sequelizeConfig)
    const transactions = await database.transaction_history_view.findAll({
      where: filter,
      attributes: [
        'IDTRANSACTION', 'ORDER', 'TRANSACTION_TYPE', 'CREATED_AT',
        'ORIGIN_CURRENCY', 'CVC_FROM', 'AMOUNT_FROM', 'BNS_COMMISSION_USD',
        'MINER_FEE_USD'
      ]
    })

    return res.json({ success: true, message: 'Ok', transaction: transactions || {} })
  } catch (error) {
    return res.json({ success: false, message: error }).status(400)
  }
}


const findOne = async (req, res) => {
  const filter = req.filter || {}
  if (paramsValidator(req.params)) {
    try {
      const database = await initDataBase(sequelizeConfig)
      const transaction = await database.transaction_history_view.findOne({
        where: {
          [Op.and]: [
            { IDTRANSACTION: req.params.id },
            filter
          ]
        },
        attributes: [
          'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY',
          'CUSTOMER_DNI', 'CREATED_AT', 'TRANSACTION_TYPE',
          'ORIGIN_CURRENCY', 'AMOUNT_FROM', 'DESTINATION_CURRENCY', 'AMOUNT_TO',
          'MINER_FEE_USD', 'MINER_FEE_CRYPTO', 'CVC_FROM',
          'BNS_COMMISSION_USD'
        ]
      })
      return res.json({ success: true, message: 'Ok', transaction: transaction || {} })
    } catch (error) {
      return res.json({ success: false, message: error }).status(400)
    }
  } else {
    res.json({ success: false, message: 'Error' }).status(400)
  }
}

const findByIdCustomer = async (req, res) => {
  const filter = req.filter || {}
  if (paramsValidator(req.params)) {
    try {
      const database = await initDataBase(sequelizeConfig)
      const transaction = await database.transaction_history_view.findAll({
        where: {
          [Op.and]: [
            { IDCUSTOMER: req.params.id },
            filter
          ]
        },
        attributes: [
          'IDTRANSACTION', 'IDAGENT_WALLET', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY',
          'CUSTOMER_DNI', 'CREATED_AT', 'TRANSACTION_TYPE',
          'ORIGIN_CURRENCY', 'AMOUNT_FROM', 'DESTINATION_CURRENCY', 'AMOUNT_TO',
          'MINER_FEE_USD', 'MINER_FEE_CRYPTO', 'CVC_FROM',
          'BNS_COMMISSION_USD'
        ]
      })
      return res.json({ success: true, message: 'Ok', transaction: transaction || {} })
    } catch (error) {
      return res.json({ success: false, message: error }).status(400)
    }
  } else {
    res.json({ success: false, message: 'failed' })
  }
}


const findByFilter = async (req, res) => {
  const filter = req.filter
  let where = {}
  if (Array.isArray(req.filter)) {
    where = {
      [Op.and]: [
        { IDCUSTOMER: req.params.id },
        filter[0], // IDBO_USER?
        filter[1] // TRANSACTION_TYPE?
      ]
    }
  } else {
    where = {
      [Op.and]: [
        { IDCUSTOMER: req.params.id },
        filter // TRANSACTION_TYPE?
      ]
    }
  }

  try {
    const database = await initDataBase(sequelizeConfig)
    const transaction = await database.transaction_history_view.findAll({
      where,
      attributes: [
        'IDTRANSACTION', 'IDAGENT_WALLET', 'AGENT_FULLNAME', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY',
        'CUSTOMER_DNI', 'CREATED_AT', 'TRANSACTION_TYPE',
        'ORIGIN_CURRENCY', 'AMOUNT_FROM', 'DESTINATION_CURRENCY', 'AMOUNT_TO',
        'MINER_FEE_USD', 'MINER_FEE_CRYPTO', 'CVC_FROM',
        'BNS_COMMISSION_USD'
      ]
    })
    return res.json({ success: true, message: 'Ok', transaction: transaction || {} })
  } catch (error) {
    return res.json({ success: false, message: error }).status(400)
  }
}


const findAllPurchases = async (req, res) => {
  const filter = req.filter || {}
  try {
    const database = await initDataBase(sequelizeConfig)
    const transaction = await database.transaction_history_view.findAll({
      where: {
        [Op.and]: [
          { FK_TYPE: '1' },
          filter
        ]
      },
      attributes: [
        'IDTRANSACTION', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY',
        'CUSTOMER_DNI', 'CREATED_AT', 'TRANSACTION_TYPE',
        'ORIGIN_CURRENCY', 'AMOUNT_FROM', 'DESTINATION_CURRENCY', 'AMOUNT_TO',
        'MINER_FEE_USD', 'MINER_FEE_CRYPTO', 'CVC_FROM',
        'BNS_COMMISSION_USD'
      ]
    })
    return res.json({ success: true, message: 'Ok', transaction: transaction || {} })
  } catch (error) {
    return res.json({ success: false, message: error }).status(400)
  }
}


const findAllSales = async (req, res) => {
  const filter = req.filter || {}
  try {
    const database = await initDataBase(sequelizeConfig)
    const transaction = await database.transaction_history_view.findAll({
      where: {
        [Op.and]: [
          { FK_TYPE: '2' },
          filter
        ]
      },
      attributes: [
        'IDTRANSACTION', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY',
        'CUSTOMER_DNI', 'CREATED_AT', 'TRANSACTION_TYPE',
        'ORIGIN_CURRENCY', 'AMOUNT_FROM', 'DESTINATION_CURRENCY', 'AMOUNT_TO',
        'MINER_FEE_USD', 'MINER_FEE_CRYPTO', 'CVC_FROM',
        'BNS_COMMISSION_USD'
      ]
    })
    return res.json({ success: true, message: 'Ok', transaction: transaction || {} })
  } catch (error) {
    return res.json({ success: false, message: error }).status(400)
  }
}


const create = async (req, res) => {
  if (createValidator(req.body)) {
    try {
      const { transaction, info } = req.body
      const database = await initDataBase(sequelizeConfig)

      let order = ''
      if (transaction.idtype === 1) order = `C${new Date().getTime()}`
      if (transaction.idtype === 2) order = `V${new Date().getTime()}`
      if (transaction.idtype === 3) order = `E${new Date().getTime()}`
      transaction.order = order

      const dataTransaction = {
        ORDER: transaction.order,
        COIN_FROM: transaction.idcoin_from,
        COIN_TO: transaction.idcoin_to,
        AMOUNT_FROM: transaction.amount_from,
        AMOUNT_TO: transaction.amount_to,
        CITY: transaction.city,
        AGENT_WALLET: transaction.agent_wallet,
        CUSTOMER_WALLET: transaction.customer_wallet,
        BUSINESS_FEE: transaction.idfee,
        FK_TYPE: transaction.idtype,
        FK_STATUS: transaction.idstatus,
        FK_COUNTRY: transaction.idcountry,
        CREATED_AT: constants.NOW()
      }

      try {
        const currentTransaction = await database.transaction.create(dataTransaction)

        const rplm = {
          idtransaction: currentTransaction.IDTRANSACTION,
          idtype: transaction.idtype,
          transaction_amount_usd: info.transaction_amount_usd,
          miner_fee_crypto: info.miner_fee_crypto,
          amount_to: transaction.amount_to,
          amount_from: transaction.amount_from,
          cvc_to: info.cvc_to,
          cvc_from: info.cvc_from,
          agent_wallet: transaction.agent_wallet
        }

        try {
          const newTransaction = await database.sequelize.query(storageProcess.calculateProfit(), { replacements: rplm })
          try {
            const { success, message } = await sendReport(newTransaction[0])
            res.json({ success, message, newTransaction })
          } catch (error) {
            res.json({ success: false, message: 'Something wrong' })
          }
        } catch (error) {
          res.json({ success: false, message: error }).status(400)
        }
      } catch (error) {
        res.json({ success: false, message: error }).status(400)
      }
    } catch (error) {
      return res.json({ success: false, message: `Something wrong: ${error}` }).status(400)
    }
  } else {
    return res.sendStatus(400)
  }
}


module.exports = {
  findAll,
  findOne,
  findByIdCustomer,
  findByFilter,
  findAllPurchases,
  findAllSales,
  create,
}
