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
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE,
    DISABLED_AT: DataTypes.DATE,
    IS_ACTIVE: DataTypes.BOOLEAN
  },
  {
    modelName: 'coin',
    freezeTableName: true,
    timestamps: false
  }
  )
}
