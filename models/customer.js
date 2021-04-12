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
      type: DataTypes.TEXT('medium'),
      validate: {
        notEmpty: true
      }
    },
    PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: '0000-0000'
    },
    EMAIL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255),
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      allowNull: true,
      type: DataTypes.DATE
    },
    IS_ACTIVE: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  },
  {
    modelName: 'customer',
    freezeTableName: true,
    timestamps: false
  }
  )
}
