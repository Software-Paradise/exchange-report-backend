'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class wallet extends Model {
    static associate (models) {
      wallet.belongsTo(models.users, {
        foreignKey: 'id_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })

      wallet.belongsTo(models.type_coin, {
        foreignKey: 'id_coin',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })
    }
  };
  wallet.init({
    id_wallet: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING(255)
    },
    id_user: DataTypes.INTEGER,
    id_coin: DataTypes.INTEGER,
    amount: DataTypes.FLOAT(11, 8),
    date_create: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    date_modification: {
      allowNull: true,
      type: DataTypes.DATE
    },
    date_disabled: {
      allowNull: true,
      type: DataTypes.DATE
    }

  }, {
    sequelize,
    modelName: 'wallet',
    freezeTableName: true,
    timestamps: false
  })
  return wallet
}
