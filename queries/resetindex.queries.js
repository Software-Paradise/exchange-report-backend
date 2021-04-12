module.exports = {
  resetIndexTable: (database, table) => {
    return `
     DELETE FROM ${database}.${table} WHERE 1;  
     ALTER TABLE ${database}.${table} AUTO_INCREMENT = 1;`
  }
}
