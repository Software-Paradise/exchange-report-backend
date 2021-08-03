'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('countries', {

    IDCOUNTRY: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    NAME: {
      allowNull: false,
      type: DataTypes.STRING(255),
      validate: { notEmpty: true }
    },
    ALPHA3CODE: {
      allowNull: false,
      defaultValue: '-',
      type: DataTypes.STRING(4),
      validate: { notEmpty: true }
    },
    CALLINGCODES: {
      allowNull: false,
      defaultValue: '-',
      type: DataTypes.STRING(4),
      validate: { notEmpty: true }
    },
    TIMEZONES: {
      allowNull: false,
      type: DataTypes.STRING(30),
      validate: { notEmpty: true }
    }
  },
  {
    modelName: 'countries',
    freezeTableName: true,
    timestamps: false
  }
  )
}
