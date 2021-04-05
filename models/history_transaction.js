'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('history_transaction', {

    FK_TRANSACTION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      references: {
        model: 'transaction',
        key: 'IDTRANSACTION',
        as: 'FK_TRANSACTION'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    COIN_TO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'COIN_TO'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    COIN_FROM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'COIN_FROM'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    AMOUNT_TO: DataTypes.FLOAT,
    AMOUNT_FROM: DataTypes.FLOAT,
    CURRENT_VALUE: DataTypes.FLOAT,
    COMMISSION_USD: DataTypes.FLOAT,
    COMMISSION_CRYPTO: DataTypes.FLOAT
  },
  {
    modelName: 'history_transaction',
    freezeTableName: true,
    timestamps: false
  }
  )
}
