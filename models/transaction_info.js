'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_info', {

    FK_TRANSACTION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'transaction', key: 'IDTRANSACTION', as: 'FK_TRANSACTION' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    TRANSACTION_AMOUNT_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    BNS_COMMISSION_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    BNS_COMMISSION_CRYPTO: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    EXE_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    EXE_CRYPTO: {
      type: DataTypes.FLOAT(16, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isFloat: true }
    },
    MINER_FEE_PERCENTAGE: {
      type: DataTypes.DECIMAL(6, 5),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    MINER_FEE_CRYPTO: {
      type: DataTypes.FLOAT(16, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isFloat: true }
    },
    MINER_FEE_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    AGENT_PROFIT_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    BUSINESS_PROFIT_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    CVC_FROM: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    CVC_TO: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    }
  },
  {
    modelName: 'transaction_info',
    freezeTableName: true,
    timestamps: false
  }
  )
}
