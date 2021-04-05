module.exports = {
  /**
   *
   * @param {Object} data Permiso que requiere la ruta para ser consultada
   * @returns
   */
  canViewUsersInfo: (data) => (req, res, next) => {
    if (req.data.permission !== undefined && req.data.permission !== null && req.data.permission[0]) {
      const PERMISSION = req.data.permission.split(',')
      if (PERMISSION.includes(data[0]) || req.data.rol === 'ROOT') {
        next()
      } else if (PERMISSION.includes(data[1])) {
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
