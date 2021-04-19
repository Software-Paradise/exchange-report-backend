'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_docs_kyc', {

    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'customer', key: 'IDCUSTOMER', as: 'FK_CUSTOMER' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    DOCUMENT: {
      allowNull: true,
      type: DataTypes.BLOB('medium')
    }
  },
  {
    modelName: 'customer_docs_kyc',
    freezeTableName: true,
    timestamps: false
  }
  )
}
