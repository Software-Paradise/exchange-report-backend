'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction_status', {

    IDSTATUS: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    STATUS: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    }
  },
  {
    modelName: 'transaction_status',
    freezeTableName: true,
    timestamps: false
  }
  )
}
