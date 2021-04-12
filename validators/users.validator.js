module.exports = {
  /**
   *
   * @param {Object} data | NewUser Object
   * @returns
   */
  createValidator: (data) => {
    if (data?.user && data?.usercommerceinfo && data?.admin) {
      const { user, usercommerceinfo, admin } = data
      if (
        user?.email &&
          user?.password &&
          user?.commission &&
          user?.idcommerce &&
          user?.idprofile &&
        usercommerceinfo?.fullname &&
          usercommerceinfo?.position &&
          usercommerceinfo?.address &&
          usercommerceinfo?.phone &&
          usercommerceinfo?.dni &&
        admin?.commerce &&
        admin?.useradmin
      ) return true
    } else return false
  },
  /**
   *
   * @param {Object} data | Credential Object
   * @returns
   */
  loginValidator: (data) => {
    if (data?.credentials) {
      const { credentials } = data
      if (credentials?.email && credentials?.password) return true
      else return false
    }
  }
}
