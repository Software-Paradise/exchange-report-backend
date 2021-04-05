const PROFILE_HAS_PERMISSION = [{ PROFILE: 0, PERMISSION: '' }]
const updateRole = (data) => {
  PROFILE_HAS_PERMISSION.splice(0, PROFILE_HAS_PERMISSION.length, ...data)
}

module.exports = {
  getRoles: () => (PROFILE_HAS_PERMISSION),
  updateRole
}
