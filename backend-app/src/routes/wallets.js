const router = require('express').Router()
const walletController = require('../controllers/walletController')
const auth = require('../middleware/auth')

router.get('/list', auth, walletController.listWallets)
router.post('/create', auth, walletController.create)

module.exports = router
