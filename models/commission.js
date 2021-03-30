'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('commission', {

    IDCOMMISSION: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DESCRIPTION: DataTypes.TEXT('tiny'),
    PERCENTAGE: DataTypes.DECIMAL(4, 2)
  },
  {
    modelName: 'commission',
    freezeTableName: true,
    timestamps: false
  }
  )
}
