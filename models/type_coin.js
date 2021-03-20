/* eslint-disable camelcase */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class type_coin extends Model {
    static associate (models) {
      type_coin.hasMany(models.wallet, {
        foreignKey: 'id_coin'
      })

      type_coin.hasMany(models.history_transaction, {
        foreignKey: 'id_coin_from'
      })

      type_coin.hasMany(models.history_transaction, {
        foreignKey: 'id_coin_to'
      })
    }
  };
  type_coin.init({
    id_coin: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    symbol: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(45)
    },
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
    },
    wallet: {
      allowNull: true,
      type: DataTypes.STRING(255)
    }

  },
  {
    sequelize,
    modelName: 'type_coin',
    freezeTableName: true,
    timestamps: false
  })
  return type_coin
}
