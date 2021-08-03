const { login, downloadProfilePicture } = require('../../controllers/alypay/auth.controller')
// const authentication = require('../middlewares/authentication')
const router = require('express').Router()

/**
 *
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (prefix, app) => {
    app.use(prefix, router)

    router.post('/login', login)
    router.get('/profile_picture/:fileKey', downloadProfilePicture)
}