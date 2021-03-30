'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('commerce_representative_info', {

    FK_BO_USER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
      type: DataTypes.TEXT('medium'),
      defaultValue: '-'
    },
    POSITION: {
      allowNull: false,
      type: DataTypes.TEXT('medium'),
      defaultValue: '-'
    },
    DNI: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    NUMBER_PASSPORT: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    ADDRESS: {
      allowNull: false,
      type: DataTypes.TEXT('medium'),
      defaultValue: '-'
    },
    PHONE: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: '0000-0000'
    },
    EMAIL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE
  },
  {
    modelName: 'commerce_representative_info',
    freezeTableName: true,
    timestamps: false
  }
  )
}
