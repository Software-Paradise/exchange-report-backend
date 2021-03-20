require('dotenv').config()

const username = process.env.DBUSERNAME
const password = process.env.DBPASSWORD
const database = process.env.DBNAME
const host = process.env.DBHOST
const node_env = process.env.NODE_ENV
const dialect = process.env.DBDIALECT

const config = {
  development: {
    username,
    password,
    database,
    options: {
      dialect,
      host
    }
  },
  test: {},
  production: {}
}

module.exports = config[node_env]
