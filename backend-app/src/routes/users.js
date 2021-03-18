const router = require('express').Router()
const userController = require('../controllers/usersController')
const auth = require('../middleware/auth')

router.get('/list', auth, userController.listUsers)
router.post('/register', userController.register)
router.post('/activation', userController.activation)
router.post('/login', userController.login)

module.exports = router
