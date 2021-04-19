'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_history_view', {

    IDBO_USER: { type: DataTypes.INTEGER, primaryKey: true },
    IDCUSTOMER: { type: DataTypes.INTEGER },
    AGENT_FULLNAME: { type: DataTypes.TEXT('medium') },
    CUSTOMER_FULLNAME: { type: DataTypes.TEXT('medium') },
    CUSTOMER_EMAIL: { type: DataTypes.STRING(255) },
    CUSTOMER_DNI: { type: DataTypes.TEXT('medium') },
    AGENT_EMAIL: { type: DataTypes.STRING(255) },
    IDAGENT_WALLET: { type: DataTypes.INTEGER },
    HASH_AGENT_WALLET: { type: DataTypes.STRING(255) },
    IDCUSTOMER_WALLET: { type: DataTypes.INTEGER },
    HASH_CUSTOMER_WALLET: { type: DataTypes.STRING(255) },
    IDTRANSACTION: { type: DataTypes.INTEGER },
    ORDER: { type: DataTypes.STRING(255) },
    COIN_FROM: { type: DataTypes.INTEGER },
    AMOUNT_FROM: { type: DataTypes.FLOAT(16, 10) },
    ORIGIN_CURRENCY: { type: DataTypes.STRING(20) },
    COIN_TO: { type: DataTypes.INTEGER },
    AMOUNT_TO: { type: DataTypes.FLOAT(16, 10) },
    DESTINATION_CURRENCY: { type: DataTypes.STRING(20) },
    AGENT_FEE: { type: DataTypes.DECIMAL(3, 2) },
    CITY: { type: DataTypes.STRING(100) },
    BUSINESS_FEE: { type: DataTypes.INTEGER },
    FEES: { type: DataTypes.DECIMAL(5, 4) },
    FK_TYPE: { type: DataTypes.INTEGER },
    TRANSACTION_TYPE: { type: DataTypes.STRING(255) },
    FK_COUNTRY: { type: DataTypes.INTEGER },
    COUNTRY: { type: DataTypes.STRING(255) },
    ALPHA3CODE: { type: DataTypes.STRING(4) },
    CREATED_AT: { type: DataTypes.DATE },
    UPDATED_AT: { type: DataTypes.DATE },
    TRANSACTION_AMOUNT_USD: { type: DataTypes.DECIMAL(12, 4) },
    BNS_COMMISSION_USD: { type: DataTypes.DECIMAL(12, 4) },
    BNS_COMMISSION_CRYPTO: { type: DataTypes.FLOAT(16, 8) },
    EXE_USD: { type: DataTypes.DECIMAL(12, 4) },
    EXE_CRYPTO: { type: DataTypes.FLOAT(16, 8) },
    MINER_FEE_PERCENTAGE: { type: DataTypes.DECIMAL(6, 5) },
    MINER_FEE_CRYPTO: { type: DataTypes.FLOAT(16, 8) },
    MINER_FEE_USD: { type: DataTypes.DECIMAL(12, 4) },
    AGENT_PROFIT_USD: { type: DataTypes.DECIMAL(12, 4) },
    BUSINESS_PROFIT_USD: { type: DataTypes.DECIMAL(12, 4) },
    CVC_FROM: { type: DataTypes.DECIMAL(12, 4) },
    CVC_TO: { type: DataTypes.DECIMAL(12, 4) }
  },
  {
    modelName: 'transaction_history_view',
    freezeTableName: true,
    timestamps: false
  }
  )
}
