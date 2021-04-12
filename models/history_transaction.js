'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('history_transaction', {

    IDTRANSACTION: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ORDER: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    COIN_TO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'COIN_TO'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    COIN_FROM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'coin',
        key: 'IDCOIN',
        as: 'COIN_FROM'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_WALLET_BOU: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'bo_wallet',
        key: 'ID_WALLET',
        as: 'FK_WALLET_BOU'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    FK_WALLET_CTM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'customer_wallet',
        key: 'ID_WALLET',
        as: 'FK_WALLET_CTM'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    },
    AMOUNT_TO: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true,
        isFloat: true
      }
    },
    AMOUNT_FROM: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true,
        isFloat: true
      }
    },
    COMMISSION_USD: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true,
        isFloat: true
      }
    },
    COMMISSION_CRYPTO: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true,
        isFloat: true
      }
    },
    CURRENT_VALUE: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true,
        isFloat: true
      }
    },
    FK_COMMISSION: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'commission',
        key: 'IDCOMMISSION',
        as: 'FK_COMMISSION'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    FK_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'transaction_type',
        key: 'IDTRANSACTION_TYPE',
        as: 'FK_TYPE'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    },
    FK_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isNumeric: true
      },
      references: {
        model: 'transaction_status',
        key: 'IDTRANSACTION_STATUS',
        as: 'FK_STATUS'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
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
    modelName: 'history_transaction',
    freezeTableName: true,
    timestamps: false
  }
  )
}
