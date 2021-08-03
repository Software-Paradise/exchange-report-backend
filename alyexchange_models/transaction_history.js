'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_history_view', {

    IDEXECUTIVE: { type: DataTypes.INTEGER },
    EXECUTIVE_FULLNAME: { type: DataTypes.TEXT('medium') },
    EXECUTIVE_MAIL: { type: DataTypes.STRING(255) },
    IDCUSTOMER: { type: DataTypes.INTEGER },
    CUSTOMER_FULLNAME: { type: DataTypes.TEXT('medium') },
    CUSTOMER_EMAIL: { type: DataTypes.STRING(255) },
    CUSTOMER_DNI: { type: DataTypes.STRING(50) },
    IEW_IDWALLET: { type: DataTypes.INTEGER }, // INCOME ENTERPRISE ID
    IEW_ADDRESS: { type: DataTypes.STRING(255) }, // INCOME ENTERPRISE ADDRESS
    EIC_IDCOIN: { type: DataTypes.INTEGER }, // ENTERPRISE INCOME CURRENCY ID
    EIC_NAME: { type: DataTypes.STRING(20) }, // ENTERPRISE INCOME CURRENCY NAME
    EIC_SYMBOL: { type: DataTypes.STRING(10) }, // ENTERPRISE INCOME CURRENCY SYMBOL
    PEW_IDWALLET: { type: DataTypes.INTEGER }, // PAYMENY ENTERPRISE WALLET ID
    PEW_ADDRESS: { type: DataTypes.STRING(255) }, // PAYMENT ENTERPRISE WALLET ADDRESS
    EWC_IDCOIN: { type: DataTypes.INTEGER }, // ENTERPRISE WITHDRAWALS CURRENCY ID
    EWC_NAME: { type: DataTypes.STRING(20) }, // ENTERPRISE WITHDRAWALS CURRENCY NAME
    EWC_SYMBOL: { type: DataTypes.STRING(10) }, // ENTERPRISE WITHDRAWALS CURENCY SYMBOL
    ICW_IDWALLET: { type: DataTypes.INTEGER },
    ICW_ADDRESS: { type: DataTypes.STRING(255) },
    CIC_IDCOIN: { type: DataTypes.INTEGER },
    CIC_NAME: { type: DataTypes.STRING(20) },
    CIC_SYMBOL: { type: DataTypes.STRING(10) },
    PCW_IDWALLET: { type: DataTypes.INTEGER },
    PCW_ADDRESS: { type: DataTypes.STRING(255) },
    CWC_IDCOIN: { type: DataTypes.INTEGER },
    CWC_NAME: { type: DataTypes.STRING(20) },
    CWC_SYMBOL: { type: DataTypes.STRING(10) },
    IDTRANSACTION: { type: DataTypes.INTEGER, primaryKey: true },
    AMOUNT_FROM: { type: DataTypes.STRING(15) },
    AMOUNT_TO: { type: DataTypes.STRING(15) },
    ORDER: { type: DataTypes.STRING(255) },
    HASH: { type: DataTypes.STRING(255) },
    BUSINESS_FEE: { type: DataTypes.INTEGER },
    TYPE: { type: DataTypes.STRING(255) },
    STATUS: { type: DataTypes.STRING(255) },
    AMOUNT_USD: { type: DataTypes.STRING(16) },
    BNS_COMMISSION_USD: { type: DataTypes.STRING(16) },
    BNS_PROFIT_USD: { type: DataTypes.STRING(13) },
    BNS_PROFIT_CRYPTO: { type: DataTypes.DECIMAL(10, 8) },
    MINER_FEE_PCT: { type: DataTypes.STRING(6) },
    MINER_FEE_USD: { type: DataTypes.STRING(16) },
    MINER_FEE_CRIPTO: { type: DataTypes.DECIMAL(10, 8) },
    EXECUTIVE_FEE_PCT: { type: DataTypes.STRING(5) },
    EXECUTIVE_PROFIT_USD: { type: DataTypes.STRING(5) },
    EXECUTIVE_PROFIT_CRIPTO: { type: DataTypes.DECIMAL(10, 4) },
    EXE_USD: { type: DataTypes.STRING(16) },
    EXE_CRIPTO: { type: DataTypes.DECIMAL(12, 8) },
    CVC_FROM: { type: DataTypes.DECIMAL(12, 4) },
    CVC_TO: { type: DataTypes.DECIMAL(12, 4) },
    CREATED_AT: { type: DataTypes.DATE },
    CITY: { type: DataTypes.STRING(100) },
    COUNTRY: { type: DataTypes.STRING(255) },
    TIMESZONES: { type: DataTypes.STRING(30) },
    ALPHA3CODE: { type: DataTypes.STRING(4) }

  },
  {
    modelName: 'transaction_history_view',
    freezeTableName: true,
    timestamps: false
  }
  )
}
