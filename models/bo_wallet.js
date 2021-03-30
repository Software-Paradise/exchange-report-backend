'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bo_wallet', {

    IDBO_WALLET: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    FK_WALLET_CURRENCY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'FK_WALLET_CURRENCY'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }
  },
  {
    modelName: 'bo_wallet',
    freezeTableName: true,
    timestamps: false
  }
  )
}
