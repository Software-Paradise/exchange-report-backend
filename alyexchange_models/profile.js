'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('profile', {

    IDPROFILE: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PROFILE: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
      defaultValue: '-'
    }
  },
  {
    modelName: 'profile',
    freezeTableName: true,
    timestamps: false
  }
  )
}
