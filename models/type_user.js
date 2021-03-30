'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('type_user', {

    IDTYPE_USER: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TYPE_USER: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
      defaultValue: '-'
    }
  },
  {
    modelName: 'type_user',
    freezeTableName: true,
    timestamps: false
  }
  )
}
