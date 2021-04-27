'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction', {

    IDTRANSACTION: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ORDER: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    COIN_FROM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'coin', key: 'IDCOIN', as: 'COIN_FROM' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    COIN_TO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'coin', key: 'IDCOIN', as: 'COIN_TO' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    AMOUNT_FROM: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isFloat: true }
    },
    AMOUNT_TO: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isFloat: true }
    },
    CITY: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    AGENT_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'agent_wallet', key: 'ID_WALLET', as: 'AGENT_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    CUSTOMER_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'customer_wallet', key: 'ID_WALLET', as: 'CUSTOMER_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    BUSINESS_FEE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'fees', key: 'IDFEES', as: 'BUSINESS_FEE' },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    FK_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'transaction_type', key: 'IDTYPE', as: 'FK_TYPE' },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    FK_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'transaction_status', key: 'IDSTATUS', as: 'FK_STATUS' },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    FK_COUNTRY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'countries', key: 'IDCOUNTRY', as: 'FK_COUNTRY' },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    modelName: 'transaction',
    freezeTableName: true,
    timestamps: false
  }
  )
}
