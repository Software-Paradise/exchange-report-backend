'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('fees', {

    IDFEES: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DESCRIPTION: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    CONDITION_FEES: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    FEES: {
      allowNull: false,
      type: DataTypes.DECIMAL(5, 4)
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    modelName: 'fees',
    freezeTableName: true,
    timestamps: false
  }
  )
}
