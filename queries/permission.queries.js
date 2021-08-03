module.exports = {
  getPermissions: () => {
    return `SELECT

        GROUP_CONCAT(DISTINCT(CONCAT(PM.PERMISSION))) AS PERMISSION
        
        FROM user AS USR 
        INNER JOIN profile AS PR ON PR.IDPROFILE = USR.FK_PROFILE
        INNER JOIN portfolio AS PF ON PF.FK_PROFILE = PR.IDPROFILE
        INNER JOIN modalex AS MD ON MD.IDMODALEX = PF.FK_MODULE
        INNER JOIN portfolio_has_permission AS PP ON PP.FK_PORTFOLIO = PF.IDPORTFOLIO
        INNER JOIN permission AS PM ON PM.IDPERMISSION = PP.FK_PERMISSION
        WHERE USR.IDUSER = :iduser AND MD.MODULE = :module`
  }
}
