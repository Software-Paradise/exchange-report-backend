'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_info_kyc', {

    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: { model: 'customer', key: 'IDCUSTOMER', as: 'FK_CUSTOMER' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    BIRTHDAY: {
      allowNull: true,
      type: DataTypes.DATE
    },
    ADDRESS: {
      allowNull: false,
      type: DataTypes.TEXT('medium')
    },
    RUC: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(255)
    },
    PASSPORT: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
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
    }
  },
  {
    modelName: 'customer_info_kyc',
    freezeTableName: true,
    timestamps: false
  }
  )
}
