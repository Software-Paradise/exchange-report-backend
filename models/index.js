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
    db.bo_user.hasOne(db.bo_wallet, { foreignKey: 'FK_BOUSER' })
    db.bo_user.hasOne(db.bouser_info, { foreignKey: 'FK_BO_USER' })
    /** ****************************************************************************************** */

    /** **BO_WALLET******************************************************************************* */
    db.bo_wallet.belongsTo(db.bo_user, { foreignKey: 'FK_BOUSER' })
    db.bo_wallet.hasOne(db.history_transaction, { foreignKey: 'FK_WALLET_BOU' })
    /** ****************************************************************************************** */

    /** COMMERCER********************************************************************************* */
    db.commerce.hasMany(db.bo_user, { foreignKey: 'FK_COMMERCE' })
    /** ****************************************************************************************** */

    /** BACKOFFICE USER INFO ********************************************************************* */
    db.bouser_info.belongsTo(db.bo_user, { foreignKey: 'FK_BO_USER' })
    /** ****************************************************************************************** */

    /** COMMISSION******************************************************************************** */
    db.commission.hasMany(db.history_transaction, { foreignKey: 'FK_COMMISSION' })
    /** ****************************************************************************************** */

    /** COIN************************************************************************************** */
    db.coin.hasMany(db.history_transaction, { foreignKey: 'COIN_TO' })
    db.coin.hasMany(db.history_transaction, { foreignKey: 'COIN_FROM' })
    db.coin.belongsToMany(db.dates_storage, { through: 'cvc', as: 'coinhavedates', foreignKey: 'FK_COIN' })
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
    db.customer_wallet.hasOne(db.history_transaction, { foreignKey: 'FK_WALLET_CTM' })
    /** ****************************************************************************************** */

    /** CUSTOMER_WALLET*****************************************************************************/
    db.dates_storage.belongsToMany(db.coin, { through: 'cvc', as: 'datehavecoins', foreignKey: 'FK_DATE' })
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

    /** HISTORY_TRANSACTION *************************************************************************/
    db.history_transaction.belongsTo(db.coin, { foreignKey: 'COIN_TO' })
    db.history_transaction.belongsTo(db.coin, { foreignKey: 'COIN_FROM' })
    db.history_transaction.belongsTo(db.bo_wallet, { foreignKey: 'FK_WALLET_BOU' })
    db.history_transaction.belongsTo(db.customer_wallet, { foreignKey: 'FK_WALLET_CTM' })
    db.history_transaction.belongsTo(db.transaction_status, { foreignKey: 'FK_STATUS' })
    db.history_transaction.belongsTo(db.transaction_type, { foreignKey: 'FK_TYPE' })
    db.history_transaction.belongsTo(db.commission, { foreignKey: 'FK_COMMISSION' })
    /** ****************************************************************************************** */

    /** TRANSACTION_STATUS************************************************************************ */
    db.transaction_status.hasMany(db.history_transaction, { foreignKey: 'FK_STATUS' })
    /** ****************************************************************************************** */

    /** TRANSACTION_TYPE************************************************************************** */
    db.transaction_type.hasMany(db.history_transaction, { foreignKey: 'FK_TYPE' })
    /** ***************************************************************************************** */

    // await sequelize.sync({ alter: false }).then(() => {
    //   console.log('All models has been created')
    // })
    //   .catch(err => {
    //     console.log(err)
    //   })

    return db
  }
}
