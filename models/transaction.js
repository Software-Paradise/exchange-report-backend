'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction', {

    IDTRANSACTION: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    NUMBER_TRANSACTION: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
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
    FK_CUSTOMER: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'IDCUSTOMER',
        as: 'FK_CUSTOMER'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_COMMISSION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'commission',
        key: 'IDCOMMISSION',
        as: 'FK_COMMISSION'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'transaction_type',
        key: 'IDTRANSACTION_TYPE',
        as: 'FK_TYPE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'transaction_status',
        key: 'IDTRANSACTION_STATUS',
        as: 'FK_STATUS'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    CREATED_AT: DataTypes.DATE,
    UPDATED_AT: DataTypes.DATE,
    DISABLED_AT: DataTypes.DATE
  },
  {
    modelName: 'transaction',
    freezeTableName: true,
    timestamps: false
  }
  )
}
