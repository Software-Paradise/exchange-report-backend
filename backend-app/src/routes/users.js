const router = require('express').Router();
const userController = require('../controllers/usersController')
const auth = require('../middleware/auth')

router.get('/list', auth, userController.listUsers);
router.post('/test/register', userController.registerTest);
router.post('/login', userController.login);

module.exports = router;