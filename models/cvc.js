'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('cvc', {

    FK_COIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'FK_COIN'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_DATE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'dates_storage',
        key: 'IDDATE',
        as: 'FK_DATE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }
  },
  {
    modelName: 'cvc',
    freezeTableName: true,
    timestamps: false
  }
  )
}
