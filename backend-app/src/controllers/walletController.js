const db = require('../models')
const walletModel = db.wallet

const walletController = {
  listWallets: async (req, res) => {
    const wallets = walletModel.findAll({})
    if (wallets) {
      res.status(200).json({ success: true, wallets })
    } else {
      res.status(400).json({ success: false, message: 'Something wrong' })
    }
  },

  create: (req, res) => {
    const newWallet = {
      id_wallet: 2,
      id_users: 1,
      id_coin: 1,
      amount: req.body.amount
    }

    walletModel.create(newWallet).then(wallet => {
      if (wallet) {
        res.status(200).json({ success: true, message: 'created successfully' })
      } else {
        res.status(400).json({ success: false, message: 'Something wrong' })
      }
    }).catch(err => {
      res.status(400).json({ success: false, message: err })
    })
  }
}

module.exports = walletController
