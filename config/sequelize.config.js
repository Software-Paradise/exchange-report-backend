'use strict'
const Sequelize = require('sequelize')
const config = require('./db.config')

console.log(config)

const sequelize = new Sequelize(config.database, config.username, config.password, config.options)

module.exports = sequelize
