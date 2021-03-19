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
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    id_user: DataTypes.INTEGER,
    id_coin: DataTypes.INTEGER,
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
