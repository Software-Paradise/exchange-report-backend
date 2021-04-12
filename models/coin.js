'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('coin', {

    IDCOIN: {
      allowNull: false,
      autoIncrement: true,
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
    CODE1: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    CODE2: {
      allowNull: false,
      type: DataTypes.STRING(5)
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      allowNull: true,
      type: DataTypes.DATE
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
