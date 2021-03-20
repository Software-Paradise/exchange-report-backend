'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    static associate (models) {
      purchase.belongsTo(models.users, {
        foreignKey: 'id_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })
    }
  };
  purchase.init({
    id_purchase: {
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
    modelName: 'purchase'
  })
  return purchase
}
