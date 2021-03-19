'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class management extends Model {
    static associate (models) {
      management.belongsTo(models.users, {
        foreignKey: 'id_user',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      })
    }
  };
  management.init({
    id_reference: DataTypes.INTEGER,
    type_transference: DataTypes.STRING,
    type_coin: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'management'
  })
  return management
}
