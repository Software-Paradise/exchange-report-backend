const { verifyPermission } = require('../controllers/alyexchange/permissions.controller')
function identifyHttp (method) {
  if (method === 'GET') return ['LIST-ALL', 'LIST-PARTIAL']
  if (method === 'POST') return ['CREATE']
  if (method === 'PUT') return ['UPDATE']
  if (method === 'DELETE') return ['DELETE']
}
module.exports = {
  /**
   *
   * @param {Object} data Permiso que requiere la ruta para ser consultada
   * @returns
   */
  canView: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (PERMISSIONS.includes(permission[0]) || req.data.rol === 'ROOT') {
        next()
      } else if (PERMISSIONS.includes(permission[1])) {
        req.filter = { IDUSER: req.data.id }
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
