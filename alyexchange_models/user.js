'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {

    IDUSER: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PHOTO: {
      allowNull: true,
      type: DataTypes.BLOB('medium')
    },
    EMAIL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255),
      validate: { notEmpty: true, isEmail: true }
    },
    PASSWORD: {
      allowNull: false,
      type: DataTypes.STRING(255),
      validate: { notEmpty: true }
    },
    COMMISSION: {
      allowNull: false,
      type: DataTypes.DECIMAL(3, 2),
      validate: { notEmpty: true, isDecimal: true }
    },
    SHOULDRESETPASS: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    CREATED_AT: {
      allowNull: false,
      type: DataTypes.DATE
    },
    UPDATED_AT: {
      type: DataTypes.DATE
    },
    DISABLED_AT: {
      type: DataTypes.DATE
    },
    FK_COMMERCE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'commerce', key: 'IDCOMMERCE', as: 'FK_COMMERCE' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_PROFILE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: { notEmpty: true, isNumeric: true },
      references: { model: 'profile', key: 'IDPROFILE', as: 'FK_PROFILE' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    IS_ACTIVE: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  },
  {
    modelName: 'user',
    freezeTableName: true,
    timestamps: false
  }
  )
}
