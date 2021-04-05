'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer', {

    IDCUSTOMER: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DNI: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    FULLNAME: {
      allowNull: false,
      type: DataTypes.TEXT('medium')
    },
    PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: '0000-0000'
    },
    EMAIL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE,
    IS_VERIFIED: DataTypes.BOOLEAN,
    IS_ACTIVE: DataTypes.BOOLEAN
  },
  {
    modelName: 'customer',
    freezeTableName: true,
    timestamps: false
  }
  )
}
