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
   * @param {String} module | Nombre del Modulo al que solicita Acceso para listar commercios
   * @returns
   */
  canView: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (PERMISSIONS.includes(permission[1])) {
        next()
      } else {
        res.status(403)
        return res.send('Not Allowed')
      }
    } else {
      res.status(401)
      return res.send('Permission not found')
    }
  },

  /**
   *
   * @param {String} module | Nombre del Modulo al que solicita Acceso para listar commercios
   * @returns
   */
  canFilter: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (req.data.rol === 'ROOT') {
        req.filter = { TRANSACTION_TYPE: module[1] }
        next()
      } else if (PERMISSIONS.includes(permission[1])) {
        req.filter = [{ IDUSER: req.data.id }, { TRANSACTION_TYPE: module[1] }]
        next()
      } else {
        res.status(403)
        return res.send('Not Allowed')
      }
    } else {
      res.status(401)
      return res.send('Permission not found')
    }
  },

  /**
   *
   * @param {String} module | Nombre del Modulo al que solicita Acceso para crear comercios
   * @returns
   */
  canCreate: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (PERMISSIONS.includes(permission[0]) && req.data.rol === 'ROOT') {
        next()
      } else {
        res.status(403)
        return res.send('Not Allowed')
      }
    } else {
      res.status(401)
      return res.send('Permission not found')
    }
  },

  /**
   *
   * @param {String} module | Nombre del Modulo al que solicita Acceso para actualizar comercios
   * @returns
   */
  canUpdate: (module) => async (req, res, next) => {
    const permission = identifyHttp(req.method)
    if (req.data.id !== undefined && req.data.id !== null) {
      const PERMISSIONS = await verifyPermission(req.data.id, module[0])
      if (PERMISSIONS.includes(permission[0]) || req.data.rol === 'ROOT') {
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
