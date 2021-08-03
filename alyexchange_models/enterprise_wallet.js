'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('enterprise_wallet', {

    IDWALLET: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ADDRESS: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    FK_COIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: { model: 'coin', key: 'IDCOIN', as: 'FK_COIN' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    BALANCE_USD: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    },
    BALANCE_CRIPTO: {
      type: DataTypes.DECIMAL(14, 8),
      allowNull: false,
      defaultValue: 0.00,
      validate: { notEmpty: true, isDecimal: true }
    }

  },
  {
    modelName: 'enterprise_wallet',
    freezeTableName: true,
    timestamps: false
  }
  )
}
