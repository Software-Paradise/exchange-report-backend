'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('type_document', {

    IDTYPE_DOC: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TYPEDOC: DataTypes.TEXT('medium')
  },
  {
    modelName: 'type_document',
    freezeTableName: true,
    timestamps: false
  }
  )
}
