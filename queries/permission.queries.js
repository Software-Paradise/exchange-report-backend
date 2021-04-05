module.exports = {
  /**
   *
   * @param {String} IDBO_USER Id del usuario
   * @returns Permisos del usuario
   */
  getPermission: (IDBO_USER) => {
    return `SELECT

        PR.PROFILE,
        GROUP_CONCAT(DISTINCT(CONCAT(PM.PERMISSION,' ',MD.MODULE))) AS PERMISSION
        
        FROM bo_user AS BO 
        INNER JOIN profile AS PR ON PR.IDPROFILE = BO.FK_PROFILE
        INNER JOIN portfolio AS PF ON PF.FK_PROFILE = PR.IDPROFILE
        INNER JOIN modalex AS MD ON MD.IDMODALEX = PF.FK_MODULE
        INNER JOIN portfolio_has_permission AS PP ON PP.FK_PORTFOLIO = PF.IDPORTFOLIO
        INNER JOIN permission AS PM ON PM.IDPERMISSION = PP.FK_PERMISSION
        WHERE BO.IDBO_USER = '${IDBO_USER}'`
  }
}
