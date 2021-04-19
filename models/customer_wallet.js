'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_wallet', {

    ID_WALLET: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    HASH: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: { model: 'customer', key: 'IDCUSTOMER', as: 'FK_CUSTOMER' },
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
