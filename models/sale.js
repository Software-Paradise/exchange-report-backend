'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    static associate (models) {
      sale.belongsTo(models.users, {
        foreignKey: 'id_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })
    }
  };
  sale.init({
    id_sale: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_user: DataTypes.INTEGER,
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'sale',
    freezeTableName: true,
    timestamps: true
  })
  return sale
}
