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
    HASH: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    AMOUNT_FROM: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    AMOUNT_TO: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    FK_USER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'user', key: 'IDUSER', as: 'FK_USER' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    INCOME_COMPANY_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'enterprise_wallet', key: 'IDWALLET', as: 'INCOME_COMPANY_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    PAYMENT_COMPANY_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'enterprise_wallet', key: 'IDWALLET', as: 'PAYMENT_COMPANY_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    INCOME_CUSTOMER_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'customer_wallet', key: 'IDWALLET', as: 'INCOME_CUSTOMER_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    PAYMENT_CUSTOMER_WALLET: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'customer_wallet', key: 'IDWALLET', as: 'PAYMENT_CUSTOMER_WALLET' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    BUSINESS_FEE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'fee', key: 'IDFEE', as: 'BUSINESS_FEE' },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    CITY: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
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
