'use strict'
const Sequelize = require('sequelize')
const config1 = require('./db.alyexchange.config')
const config2 = require('./db.alypay.config')

//console.log(config1)

/**
 * @author Alvaro Gonzalez
 * @description controlador de conexion a la base de datos de alyexchange
 */
const alyexchange = new Sequelize(
  config1.database,
  config1.username,
  config1.password,
  config1.options)

/**
 * @author Alvaro Gonzalez
 * @description controlador de conexion a la base de datos de alypay
 */
const alypay = new Sequelize(
  config2.database,
  config2.username,
  config2.password,
  config2.options)

const cluster = [alyexchange, alypay]

module.exports = cluster
