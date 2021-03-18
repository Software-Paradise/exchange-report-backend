require('dotenv').config()
const database = process.env.DATABASE

const indexQueries = {
  tableList: () => {
    return `SHOW FULL TABLES FROM ${database}`
  },

  describeTable: () => {
    return 'describe type_coin'
  }
}

module.exports = indexQueries
