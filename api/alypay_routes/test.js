const router = require('express').Router()
const pkg = require('../../package.json')
const { list } = require('../../controllers/alypay/users.controller')

/**
 * @module testRoutes test Router
 * @param {*} app - Instancia del Framework de Express
 */
module.exports = (prefix, app) => {
    app.set('pkg', pkg)
    app.use(prefix, router)

    router.get('/index', async (_, res) => {
        res.json({
            success: true,
            name: 'alyexchange2.0' || app.get('pkg').name,
            description: app.get('pkg').description,
            version: app.get('pkg').version
        })
    })

    router.get('/users', list)
}