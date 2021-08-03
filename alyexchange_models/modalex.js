'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('modalex', {

    IDMODALEX: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    MODULE: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
      defaultValue: '-'
    }
  },
  {
    modelName: 'modalex',
    freezeTableName: true,
    timestamps: false
  }
  )
}
