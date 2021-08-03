require('dotenv').config()

const username = process.env.DBUSER
const password = process.env.DBPASS
const database = process.env.DBNAME1
const host = process.env.DBHOST
const enviroment = process.env.NODE_ENV
const dialect = process.env.DBDIALECT

const config = {
  development: {
    username,
    password,
    database,
    options: {
      dialect,
      host,
      dialectOptions: {
        multipleStatements: true
      },
      // logging: false,
      timezone: '-06:00'
    }
  },
  test: {},
  production: {}
}

module.exports = config[enviroment]
