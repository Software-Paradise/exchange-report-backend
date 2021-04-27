'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_history_view', {

    AGENT_FULLNAME: { type: DataTypes.TEXT('medium') },
    IDAGENT_WALLET: { type: DataTypes.INTEGER },
    HASH_AGENT_WALLET: { type: DataTypes.STRING(255) },
    IDCUSTOMER_WALLET: { type: DataTypes.INTEGER },
    HASH_CUSTOMER_WALLET: { type: DataTypes.STRING(255) },
    IDAGENT: { type: DataTypes.INTEGER, primaryKey: true },
    AGENT_EMAIL: { type: DataTypes.STRING(255) },
    ORIGIN_CURRENCY: { type: DataTypes.STRING(20) },
    ORIGIN_SYMBOL: { type: DataTypes.STRING(10) },
    DESTINATION_CURRENCY: { type: DataTypes.STRING(20) },
    DESTINATION_SYMBOL: { type: DataTypes.STRING(10) },
    IDCUSTOMER: { type: DataTypes.INTEGER },
    CUSTOMER_FULLNAME: { type: DataTypes.TEXT('medium') },
    CUSTOMER_EMAIL: { type: DataTypes.STRING(255) },
    CUSTOMER_DNI: { type: DataTypes.STRING(50) },
    COUNTRY: { type: DataTypes.STRING(255) },
    ALPHA3CODE: { type: DataTypes.STRING(4) },
    FEES: { type: DataTypes.DECIMAL(5, 4) },
    IDTRANSACTION: { type: DataTypes.INTEGER },
    ORDER: { type: DataTypes.STRING(255) },
    AMOUNT_FROM: { type: DataTypes.DECIMAL(14, 8) },
    COIN_FROM: { type: DataTypes.INTEGER },
    AMOUNT_TO: { type: DataTypes.DECIMAL(14, 8) },
    COIN_TO: { type: DataTypes.INTEGER },
    CITY: { type: DataTypes.STRING(100) },
    BUSINESS_FEE: { type: DataTypes.INTEGER },
    FK_TYPE: { type: DataTypes.INTEGER },
    TRANSACTION_TYPE: { type: DataTypes.STRING(255) },
    FK_COUNTRY: { type: DataTypes.INTEGER },
    CREATED_AT: { type: DataTypes.DATE },
    UPDATED_AT: { type: DataTypes.DATE },
    TRANSACTION_AMOUNT_USD: { type: DataTypes.STRING(16) },
    BNS_COMMISSION_USD: { type: DataTypes.STRING(16) },
    BNS_COMMISSION_CRYPTO: { type: DataTypes.DECIMAL(10, 8) },
    EXE_USD: { type: DataTypes.STRING(16) },
    EXE_CRYPTO: { type: DataTypes.DECIMAL(12, 8) },
    MINER_FEE_PERCENTAGE: { type: DataTypes.DECIMAL(6, 5) },
    MINER_FEE_CRYPTO: { type: DataTypes.DECIMAL(12, 8) },
    MINER_FEE_USD: { type: DataTypes.STRING(16) },
    AGENT_FEE_PERCENTAGE: {type: DataTypes.DECIMAL(3 ,2) },
    AGENT_PROFIT_USD: { type: DataTypes.STRING(13) },
    BUSINESS_PROFIT_USD: { type: DataTypes.STRING(13) },
    CVC_FROM: { type: DataTypes.STRING(16) },
    CVC_TO: { type: DataTypes.STRING(16) }
    
  },
  {
    modelName: 'transaction_history_view',
    freezeTableName: true,
    timestamps: false
  }
  )
}
