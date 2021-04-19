const schedule = require('node-schedule')
const axios = require('axios')
const uri = 'http://ardent-medley-272823.appspot.com/collection/prices'

const requestOptions = {
  method: 'get',
  url: uri,
  responseType: 'json'
}

module.exports = {
  saludar: () => {
    return schedule.scheduleJob('*/1 * * * *', () => {
      axios(requestOptions)
        .then(response => {
          console.log(Object.values(response.data))
        })
        .catch(err => console.log(err))
    })
  }
}
