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
    BNS_PROFIT_USD: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    BNS_PROFIT_CRIPTO: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    MINER_FEE_PCT: {
      type: DataTypes.DECIMAL(6, 5),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    MINER_FEE_USD: {
      type: DataTypes.DECIMAL(12, 4),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    MINER_FEE_CRIPTO: {
      type: DataTypes.DECIMAL(12, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    EXECUTIVE_FEE_PCT: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    EXECUTIVE_PROFIT_USD: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    EXECUTIVE_PROFIT_CRIPTO: {
      type: DataTypes.DECIMAL(10, 4),
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
    EXE_CRIPTO: {
      type: DataTypes.DECIMAL(12, 8),
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
