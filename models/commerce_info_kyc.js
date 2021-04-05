'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('commerce_info_kyc', {

    // IDCOMMERCE_KYC: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    FK_COMMERCE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: {
        model: 'commerce',
        key: 'IDCOMMERCE',
        as: 'FK_COMMERCE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    LOCAL_IDTAX_REG: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(100)
    },
    FOREIGN_IDTAX_REG: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(100)
    },
    WEBSITE: {
      allowNull: true,
      type: DataTypes.STRING(255),
      defaultValue: '-'
    },
    COMMERCE_NAME: DataTypes.TEXT('medium'),
    COMMERCE_PHONE: DataTypes.STRING(20),
    ADDRESS_ONE: DataTypes.TEXT('medium'),
    ADDRESS_TWO: DataTypes.TEXT('medium'),
    INCORPORATION_DATE: DataTypes.DATE,
    POSTAL_CODE: DataTypes.STRING(10)
  },
  {
    modelName: 'commerce_info_kyc',
    freezeTableName: true,
    timestamps: false
  }
  )
}
