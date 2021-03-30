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
    db.bo_user.belongsTo(db.type_user, { foreignKey: 'FK_TYPE_USER' })
    db.bo_user.hasOne(db.bo_wallet, { foreignKey: 'FK_BO_USER' })
    db.bo_user.hasOne(db.commerce_representative_info, { foreignKey: 'FK_BO_USER' })
    db.bo_user.hasMany(db.transaction, { foreignKey: 'FK_BO_USER' })
    /** ****************************************************************************************** */

    /** **BO_WALLET******************************************************************************* */
    db.bo_wallet.belongsTo(db.bo_user, { foreignKey: 'FK_BO_USER' })
    db.bo_wallet.belongsTo(db.coin, { foreignKey: 'FK_WALLET_CURRENCY' })
    /** ****************************************************************************************** */

    /** COMMERCER********************************************************************************* */
    db.commerce.hasOne(db.bo_user, { foreignKey: 'FK_COMMERCE' })
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

    /** CUSTOMER_HAS_DOCUMENT********************************************************************* */
    db.customer_has_document.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    db.customer_has_document.belongsTo(db.type_document, { foreignKey: 'FK_TYPEDOC' })
    /** ****************************************************************************************** */

    /** CUSTOMER********************************************************************************** */
    db.customer.hasOne(db.customer_info_kyc, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasOne(db.customer_wallet, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasMany(db.transaction, { foreignKey: 'FK_CUSTOMER' })
    db.customer.hasMany(db.customer_has_document, { foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_INFO_KYC************************************************************************* */
    db.customer_info_kyc.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    /** ****************************************************************************************** */

    /** CUSTOMER_WALLET*****************************************************************************/
    db.customer_wallet.belongsTo(db.customer, { foreignKey: 'FK_CUSTOMER' })
    db.customer_wallet.belongsTo(db.coin, { foreignKey: 'FK_WALLET_CURRENCY' })
    /** ****************************************************************************************** */

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
    db.type_document.hasMany(db.customer_has_document, { foreignKey: 'FK_TYPEDOC' })
    /** ****************************************************************************************** */

    /** TYPE_USER********************************************************************************* */
    db.type_user.hasMany(db.bo_user, { foreignKey: 'FK_TYPE_USER' })
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
