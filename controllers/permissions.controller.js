const roles = require('../utils/roles')
/**
 *
 * @param {*} myRol Controlador de los permisos de usuario
 * @returns
 */
function getPermission (myRol) {
  const typeuser = roles.getRoles().find(rol => rol.TYPE_USER === myRol)
  return typeuser
}

module.exports = {
  getPermission
}
