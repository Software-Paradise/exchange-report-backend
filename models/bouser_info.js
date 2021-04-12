'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bouser_info', {

    FK_BO_USER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'bo_user',
        key: 'IDBO_USER',
        as: 'FK_BO_USER'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FULLNAME: {
      allowNull: false,
      validate: {
        notEmpty: true
      },
      type: DataTypes.TEXT('medium')
    },
    POSITION: {
      allowNull: false,
      type: DataTypes.TEXT('medium'),
      validate: {
        notEmpty: true
      }
    },
    DNI: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    PASSPORT: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(50)
    },
    ADDRESS: {
      allowNull: false,
      type: DataTypes.TEXT('medium')
    },
    PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    modelName: 'bouser_info',
    freezeTableName: true,
    timestamps: false
  }
  )
}
