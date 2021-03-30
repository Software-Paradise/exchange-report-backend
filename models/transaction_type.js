'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_type', {

    IDTRANSACTION_TYPE: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TYPE: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    }
  },
  {
    modelName: 'transaction_type',
    freezeTableName: true,
    timestamps: false
  }
  )
}
