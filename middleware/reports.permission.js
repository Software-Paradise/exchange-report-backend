const { verifyPermission } = require('../controllers/permissions.controller')

function identifyHttp (method) {
  if (method === 'GET') return ['LIST-ALL', 'LIST-PARTIAL']
  if (method === 'POST') return ['CREATE']
  if (method === 'PUT') return ['UPDATE']
}

module.exports = {
  /**
   *
   * @param {String} module | Nombre del Modulo al que solicita Acceso para listar commercios
   * @returns
   */
  canGenerate: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (req.data.rol === 'ROOT') {
        next()
      } else if (PERMISSIONS.includes(permission[1])) {
        req.filter = { IDBO_USER: req.data.id }
        next()
      } else {
        res.status(403)
        return res.send('Not Allowed')
      }
    } else {
      res.status(401)
      return res.send('Permission not found')
    }
  }

}
