'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('agent_wallet', {

    ID_WALLET: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    HASH: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    FK_BOUSER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: { model: 'bo_user', key: 'IDBO_USER', as: 'FK_BOUSER' },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }

  },
  {
    modelName: 'agent_wallet',
    freezeTableName: true,
    timestamps: false
  }
  )
}
