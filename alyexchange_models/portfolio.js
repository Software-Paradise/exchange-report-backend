'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('portfolio', {

    IDPORTFOLIO: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FK_PROFILE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profile',
        key: 'IDPROFILE',
        // key: 'IDPROFILE',
        as: 'FK_PROFILE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_MODULE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'modalex',
        key: 'IDMODALEX',
        as: 'FK_MODULE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }
  },
  {
    modelName: 'portfolio',
    freezeTableName: true,
    timestamps: false
  }
  )
}
