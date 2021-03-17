const router = require('express').Router();
const coinsController = require('../controllers/coinsController')
const auth = require('../middleware/auth')

router.get('/list/', auth, coinsController.listCoin);
router.post('/create', auth, coinsController.create);

module.exports = router;