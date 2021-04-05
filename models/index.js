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

    /** BO_USER ***********************************************************************************/
    db.bo_user.belongsTo(db.commerce, { foreignKey: 'FK_COMMERCE' })
    db.bo_user.belongsTo(db.profile, { foreignKey: 'FK_PROFILE' })
    db.bo_user.hasOne(db.bo_wallet, { foreignKey: 'FK_BO_USER' })
    db.bo_user.hasOne(db.commerce_representative_info, { foreignKey: 'FK_BO_USER' })
    db.bo_user.hasMany(db.transaction, { foreignKey: 'FK_BO_USER' })
    /** ****************************************************************************************** */

    /** **BO_WALLET******************************************************************************* */
    db.bo_wallet.belongsTo(db.bo_user, { foreignKey: 'FK_BO_USER' })
    db.bo_wallet.belongsTo(db.coin, { foreignKey: 'FK_WALLET_CURRENCY' })
    /** ****************************************************************************************** */

    /** COMMERCER********************************************************************************* */
    db.commerce.hasMany(db.bo_user, { foreignKey: 'FK_COMMERCE' })
    db.commerce.hasOne(db.commerce_info_kyc, { foreignKey: 'FK_COMMERCE' })
    /** ****************************************************************************************** */

    /** COMMERCE_INFO_KYC************************************************************************* */
    db.commerce_info_kyc.belongsTo(db.commerce, { foreignKey: 'FK_COMMERCE' })
    /** ****************************************************************************************** */

    /** COMMMERCE_REPRESENTATIVE_INFO************************************************************* */
    db.commerce_representative_info.belongsTo(db.bo_user, { foreignKey: 'FK_BO_USER' })
    /** ****************************************************************************************** */

    /** COMMISSION******************************************************************************** */
    db.commission.hasMany(db.transaction, { foreignKey: 'FK_COMMISSION' })
    /** ****************************************************************************************** */

    /** COIN************************************************************************************** */
    db.coin.hasMany(db.bo_wallet, { foreignKey: 'FK_WALLET_CURRENCY' })
    db.coin.hasMany(db.customer_wallet, { foreignKey: 'FK_WALLET_CURRENCY' })
    db.coin.hasMany(db.history_transaction, { foreignKey: 'COIN_TO' })
    db.coin.hasMany(db.history_transaction, { foreignKey: 'COIN_FROM' })
    /** ****************************************************************************************** */

    /** CUSTOMER********************************************************************************** */
    db.customer.hasOne(db.customer_info_kyc, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasOne(db.customer_wallet, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasMany(db.transaction, { foreignKey: 'FK_CUSTOMER' })
    db.customer.belongsToMany(db.type_document, { through: 'customer_has_document', as: 'customerhavedocuments', foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_INFO_KYC************************************************************************* */
    db.customer_info_kyc.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_WALLET*****************************************************************************/
    db.customer_wallet.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    db.customer_wallet.belongsTo(db.coin, { foreignKey: 'FK_WALLET_CURRENCY' })
    /** ****************************************************************************************** */

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
    db.profile.hasMany(db.bo_user, { foreignKey: 'FK_PROFILE' })
    db.profile.hasMany(db.portfolio, { foreignKey: 'FK_PROFILE' })
    /** *********************************************************************************************/

    /** HISTORY_TRANSACTION*********************************************************************** */
    db.history_transaction.belongsTo(db.transaction, { foreignKey: 'FK_TRANSACTION' })
    db.history_transaction.belongsTo(db.coin, { foreignKey: 'COIN_TO' })
    db.history_transaction.belongsTo(db.coin, { foreignKey: 'COIN_FROM' })
    /** ****************************************************************************************** */

    /** TRANSACTION ********************************************************************************/
    db.transaction.belongsTo(db.bo_user, { foreignKey: 'FK_BO_USER' })
    db.transaction.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    db.transaction.belongsTo(db.transaction_status, { foreignKey: 'FK_STATUS' })
    db.transaction.belongsTo(db.transaction_type, { foreignKey: 'FK_TYPE' })
    db.transaction.belongsTo(db.commission, { foreignKey: 'FK_COMMISSION' })
    db.transaction.hasOne(db.history_transaction, { foreignKey: 'FK_TRANSACTION' })
    /** ****************************************************************************************** */

    /** TRANSACTION_STATUS************************************************************************ */
    db.transaction_status.hasMany(db.transaction, { foreignKey: 'FK_STATUS' })
    /** ****************************************************************************************** */

    /** TRANSACTION_TYPE************************************************************************** */
    db.transaction_type.hasMany(db.transaction, { foreignKey: 'FK_TYPE' })
    /** ***************************************************************************************** */

    /** TYPE_DOCUMENT***************************************************************************** */
    db.type_document.belongsToMany(db.customer, { through: 'customer_has_document', as: 'documentshavecustomer', foreignKey: 'FK_TYPEDOC' })
    /** ****************************************************************************************** */

    await sequelize.sync({ alter: false }).then(() => {
      console.log('All models has been created')
    })
      .catch(err => {
        console.log(err)
      })

    return db
  }
}
