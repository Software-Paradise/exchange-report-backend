const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)

module.exports = {
  initDataBase: async (sequelize) => {
    const db = {}

    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
      })

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    // ASSOCIATIONS

    /** EXECUTIVE INFO  ****************************************************************************** */
    db.executive_info.belongsTo(db.user, { foreignKey: 'FK_USER' })
    /** ****************************************************************************************** */

    /** **ENTERPRISE_WALLET************************************************************************ */
    db.enterprise_wallet.belongsTo(db.coin, { foreignKey: 'FK_COIN' })
    db.enterprise_wallet.hasMany(db.transaction, { foreignKey: 'INCOME_COMPANY_WALLET' })
    db.enterprise_wallet.hasMany(db.transaction, { foreignKey: 'PAYMENT_COMPANY_WALLET' })
    /** ****************************************************************************************** */

    /** BO_USER ***********************************************************************************/
    db.user.belongsTo(db.commerce, { foreignKey: 'FK_COMMERCE' })
    db.user.belongsTo(db.profile, { foreignKey: 'FK_PROFILE' })
    db.user.hasOne(db.executive_info, { foreignKey: 'FK_USER' })
    db.user.hasMany(db.transaction, { foreignKey: 'FK_USER' })
    /** ****************************************************************************************** */

    /** COMMERCER********************************************************************************* */
    db.commerce.hasMany(db.user, { foreignKey: 'FK_COMMERCE' })
    /** ****************************************************************************************** */

    /** COIN************************************************************************************** */
    db.coin.hasMany(db.enterprise_wallet, { foreignKey: 'FK_COIN' })
    db.coin.hasMany(db.customer_wallet, { foreignKey: 'FK_COIN' })
    /** ****************************************************************************************** */

    /** COUNTRIES********************************************************************************* */
    db.countries.hasMany(db.transaction, { foreignKey: 'FK_COUNTRY' })
    /** ****************************************************************************************** */

    /** CUSTOMER********************************************************************************** */
    db.customer.hasOne(db.customer_info_kyc, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasOne(db.customer_wallet, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasMany(db.customer_docs_kyc, { foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_DOCS_KYC ************************************************************************ */
    db.customer_docs_kyc.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })

    /** CUSTOMER_INFO_KYC************************************************************************* */
    db.customer_info_kyc.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_WALLET*****************************************************************************/
    db.customer_wallet.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    db.customer_wallet.belongsTo(db.coin, { foreignKey: 'FK_COIN' })
    db.customer_wallet.hasMany(db.transaction, { foreignKey: 'INCOME_CUSTOMER_WALLET' })
    db.customer_wallet.hasMany(db.transaction, { foreignKey: 'PAYMENT_CUSTOMER_WALLET' })
    /** ****************************************************************************************** */

    /** FEES ************************************************************************************** */
    db.fee.hasMany(db.transaction, { foreignKey: 'BUSINESS_FEE' })
    /** ******************************************************************************************* */

    /** MODALEX**************************************************************************************/
    db.modalex.hasMany(db.portfolio, { foreignKey: 'FK_MODULE' })
    /** *********************************************************************************************/

    /** PORTFOLIO_HAS_PERMISSION*********************************************************************/
    db.permission.belongsToMany(db.portfolio, { through: 'portfolio_has_permission', as: 'portfoliohavepermissions', foreignKey: 'FK_PERMISSION' })
    /** *********************************************************************************************/

    /** PORTFOLIO ***********************************************************************************/
    db.portfolio.belongsTo(db.profile, { foreignKey: 'FK_PROFILE' })
    db.portfolio.belongsTo(db.modalex, { foreignKey: 'FK_MODULE' })
    db.portfolio.belongsToMany(db.permission, { through: 'portfolio_has_permission', as: 'permissionshaveportfolio', foreignKey: 'FK_PORTFOLIO' })

    /** PROFILE**************************************************************************************/
    db.profile.hasMany(db.user, { foreignKey: 'FK_PROFILE' })
    db.profile.hasMany(db.portfolio, { foreignKey: 'FK_PROFILE' })
    /** *********************************************************************************************/

    /** TRANSACTION *********************************************************************************/
    db.transaction.belongsTo(db.user, { foreignKey: 'FK_USER' })
    db.transaction.belongsTo(db.enterprise_wallet, { foreignKey: 'INCOME_COMPANY_WALLET' })
    db.transaction.belongsTo(db.enterprise_wallet, { foreignKey: 'PAYMENT_COMPANY_WALLET' })
    db.transaction.belongsTo(db.customer_wallet, { foreignKey: 'INCOME_CUSTOMER_WALLET' })
    db.transaction.belongsTo(db.customer_wallet, { foreignKey: 'PAYMENT_CUSTOMER_WALLET' })
    db.transaction.belongsTo(db.transaction_status, { foreignKey: 'FK_STATUS' })
    db.transaction.belongsTo(db.transaction_type, { foreignKey: 'FK_TYPE' })
    db.transaction.belongsTo(db.fee, { foreignKey: 'BUSINESS_FEE' })
    db.transaction.belongsTo(db.countries, { foreignKey: 'FK_COUNTRY' })
    db.transaction.hasMany(db.transaction_info, { foreignKey: 'FK_TRANSACTION' })
    /** ****************************************************************************************** */

    /** TRANSACTION_INFO ****************************************************************************/
    db.transaction_info.belongsTo(db.transaction, { foreignKey: 'FK_TRANSACTION' })
    /** ****************************************************************************************** */

    /** TRANSACTION_STATUS************************************************************************ */
    db.transaction_status.hasMany(db.transaction, { foreignKey: 'FK_STATUS' })
    /** ****************************************************************************************** */

    /** TRANSACTION_TYPE************************************************************************** */
    db.transaction_type.hasMany(db.transaction, { foreignKey: 'FK_TYPE' })
    /** ***************************************************************************************** */

    // await sequelize.sync({ alter: false }).then(() => {
    //   console.log('All models has been created')
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    return db
  }
}
