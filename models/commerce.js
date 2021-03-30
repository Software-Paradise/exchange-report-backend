'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('commerce', {

    IDCOMMERCE: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DESCRIPTION: {
      allowNull: false,
      type: DataTypes.STRING(255),
      defaultValue: '-'
    },
    NUMBER_PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: '0000-0000'
    },
    ZIP_CODE: {
      allowNull: false,
      type: DataTypes.STRING(10),
      defaultValue: '-'
    },
    LENGTH: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0.000
    },
    LATITUDE: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0.000
    }
  },
  {
    modelName: 'commerce',
    freezeTableName: true,
    timestamps: false
  }
  )
}
