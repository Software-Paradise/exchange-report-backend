'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    location: {
      allowNull: true,
      unique: false,
      type: DataTypes.STRING(255),
      defaultValue: '-'
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    number_phone: {
      allowNull: false,
      type: DataTypes.STRING(8),
      defaultValue: '-'
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    }
  }, 
  {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: false
  });
  return users;
};