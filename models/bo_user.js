'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bo_user', {

    IDBO_USER: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PHOTO: {
      type: DataTypes.BLOB('medium')
    },
    EMAIL: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    PASSWORD: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    RESETPASSLINK: {
      allowNull: false,
      type: DataTypes.STRING(255),
      defaultValue: '-'
    },
    SHOULDRESETPASS: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 1
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
      // primaryKey: true,
      references: {
        model: 'commerce',
        key: 'IDCOMMERCE',
        as: 'FK_COMMERCE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_PROFILE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: 'profile',
        key: 'IDPROFILE',
        as: 'FK_PROFILE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    IS_VERIFIED: {
      type: DataTypes.BOOLEAN
    },
    IS_ACTIVE: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  },
  {
    modelName: 'bo_user',
    freezeTableName: true,
    timestamps: false
  }
  )
}
