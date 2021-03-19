/* eslint-disable camelcase */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class state_transaction extends Model {
    static associate (models) {
      state_transaction.hasMany(models.history_transaction, {
        foreignKey: 'id_type'
      })
    }
  };
  state_transaction.init({
    id_state_transaction: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    data_create: {
      allowNull: false,
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    modelName: 'state_transaction',
    freezeTableName: true,
    timestamps: false
  })
  return state_transaction
}
