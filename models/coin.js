'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('coin', {

    IDCOIN: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    NAME: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(20)
    },
    SYMBOL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(10)
    },
    PRICE: {
      allowNull: true,
      type: DataTypes.FLOAT(18, 10),
      validate: { isFloat: true }
    },
    DISABLED_AT: {
      allowNull: true,
      type: DataTypes.DATE
    },
    IS_ACTIVE: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  },
  {
    modelName: 'coin',
    freezeTableName: true,
    timestamps: false
  }
  )
}
