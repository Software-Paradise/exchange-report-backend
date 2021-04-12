const router = require('express').Router()

/**
 *
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (app) => {
  app.use('/', router)

  router.get('/*', (_, res) => {
    res.sendStatus(404)
  })
  router.post('/*', (_, res) => {
    res.sendStatus(404)
  })
  router.put('/*', (_, res) => {
    res.sendStatus(404)
  })
  router.delete('/*', (_, res) => {
    res.sendStatus(404)
  })
}
