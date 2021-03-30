'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_wallet', {

    IDCUSTOMER_WALLET: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'IDCUSTOMER',
        as: 'FK_CUSTOMER'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_WALLET_CURRENCY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'FK_WALLET_CURRENCY'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }
  },
  {
    modelName: 'customer_wallet',
    freezeTableName: true,
    timestamps: false
  }
  )
}
