'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('portfolio_has_permission', {

    FK_PORTFOLIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: 'portfolio',
        key: 'IDPORTFOLIO',
        // key: 'IDPROFILE',
        as: 'FK_PORTFOLIO'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    FK_PERMISSION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: 'permission',
        key: 'IDPERMISSION',
        as: 'FK_PERMISSION'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    modelName: 'portfolio_has_permission',
    freezeTableName: true,
    timestamps: false
  }
  )
}
