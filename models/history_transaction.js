/* eslint-disable camelcase */
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class history_transaction extends Model {
    static associate (models) {
      history_transaction.belongsTo(models.state_transaction, {
        foreignKey: 'id_type',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })

      history_transaction.belongsTo(models.type_coin, {
        foreignKey: 'id_coin_from',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })

      history_transaction.belongsTo(models.type_coin, {
        foreignKey: 'id_coin_to',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })
    }
  };
  history_transaction.init({
    id_transaction: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING(25)
    },
    id_type: DataTypes.INTEGER,
    id_coin_from: DataTypes.INTEGER,
    id_coin_to: DataTypes.INTEGER,
    date_transaction: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    amount_from: {
      allowNull: false,
      type: DataTypes.FLOAT(11, 8),
      defaultValue: 0.00000
    },
    amount_to: {
      allowNull: false,
      type: DataTypes.FLOAT(11, 8),
      defaultValue: 0.00000
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
    comission_crypto: {
      allowNull: false,
      type: DataTypes.FLOAT(11, 8),
      defaultValue: 0.00000
    },
    comission_usd: {
      allowNull: false,
      type: DataTypes.FLOAT(11, 8),
      defaultValue: 0.00000
    }
  }, {
    sequelize,
    modelName: 'history_transaction',
    freezeTableName: true,
    timestamps: false
  })
  return history_transaction
}
