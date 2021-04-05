'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_info_kyc', {

    IDCUSTOMER_KYC: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'IDCUSTOMER',
        as: 'FK_CUSTOMER'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    DNI: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    BIRTHDAY: {
      allowNull: true,
      type: DataTypes.DATE
    },
    ADDRESS: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
    NATIONALITY: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
    ANSWER1: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
    ANSWER2: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
    ANSWER3: {
      allowNull: true,
      type: DataTypes.TEXT('medium')
    },
    NUMBER_PASSPORT: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    }
  },
  {
    modelName: 'customer_info_kyc',
    freezeTableName: true,
    timestamps: false
  }
  )
}
