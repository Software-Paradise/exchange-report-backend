'use strict'
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING(255),
            validate: { notEmpty: true }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(255),
            validate: { notEmpty: true }
        },
        executive: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        id_state: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 2
        },
        date_create: {
            allowNull: false,
            type: DataTypes.DATE
        },
        date_modification: {
            allowNull: false,
            type: DataTypes.DATE
        },
        date_disabled: {
            allowNull: true,
            type: DataTypes.DATE
        },
        kyc_type: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    },
        {
            modelName: 'users',
            freezeTableName: true,
            timestamps: false
        }
    )
}
