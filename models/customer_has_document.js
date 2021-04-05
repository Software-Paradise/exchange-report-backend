'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('customer_has_document', {

    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: 'customer',
        key: 'IDCUSTOMER',
        as: 'FK_CUSTOMER'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_TYPEDOC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: 'type_document',
        key: 'IDTYPE_DOC',
        as: 'FK_TYPEDOC'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    DOCUMENT: DataTypes.BLOB('medium'),
    DOCNUMBER: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    }
  },
  {
    modelName: 'customer_has_document',
    freezeTableName: true,
    timestamps: false
  }
  )
}
