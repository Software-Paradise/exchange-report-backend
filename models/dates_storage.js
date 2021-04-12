'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('dates_storage', {

    IDDATE: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DATE: {
      allowNull: false,
      unique: false,
      type: DataTypes.DATEONLY()
    },
    DATETIME: {
      allowNull: false,
      unique: false,
      type: DataTypes.DATE()
    }
  },
  {
    modelName: 'dates_storage',
    freezeTableName: true,
    timestamps: false
  }
  )
}
