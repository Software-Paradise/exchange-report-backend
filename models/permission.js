'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('permission', {

    IDPERMISSION: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PERMISSION: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100)
    }
  },
  {
    modelName: 'permission',
    freezeTableName: true,
    timestamps: false
  }
  )
}
