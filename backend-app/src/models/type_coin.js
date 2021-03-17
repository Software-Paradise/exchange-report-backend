'use strict';
const {Model, DATEONLY} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type_coin extends Model {
    
    static associate(models) {
     
    }
  };
  type_coin.init({
    id_coin: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255),
    },
    symbol: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(45),
    },
    date_create: {
      allowNull: false,
      unique: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    date_modification: {
      allowNull: true,
      unique: true,
      type: DataTypes.DATE,
    },
    date_disabled: {
      allowNull: true,
      unique: true,
      type: DataTypes.DATE,
    },

  }, 
  {
    sequelize,
    modelName: 'type_coin',
    freezeTableName: true,
    timestamps: false
  });
  return type_coin;
};