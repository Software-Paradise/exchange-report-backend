'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('commerce', {

    IDCOMMERCE: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    COMMERCE_NAME: {
      allowNull: false,
      type: DataTypes.STRING(255),
      validate: {
        notEmpty: true
      }
    },
    ADDRESS: {
      allowNull: false,
      type: DataTypes.TEXT('medium'),
      validate: {
        notEmpty: true
      }
    },
    WEBSITE: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: '0000-0000'
    },
    TAXREG: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(100)
    },
    POSTAL_CODE: {
      allowNull: true,
      type: DataTypes.STRING(10)
    },
    LENGTH: {
      allowNull: true,
      type: DataTypes.FLOAT,
      defaultValue: 0.000,
      validate: {
        isFloat: true
      }
    },
    LATITUDE: {
      allowNull: true,
      type: DataTypes.FLOAT,
      defaultValue: 0.000,
      validate: {
        isFloat: true
      }
    }
  },
  {
    modelName: 'commerce',
    freezeTableName: true,
    timestamps: false
  }
  )
}
