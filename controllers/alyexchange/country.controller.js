const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alyexchange_models')
const { createCountry } = require('../../queries/countries.queries')
const { QueryTypes } = require('sequelize')
const axios = require('axios')

/**
 * @module  countryController Coin
 */
module.exports = {

  create: async (_, res) => {
    const uri = 'https://restcountries.eu/rest/v2/all'
    const requestOptions = {
      method: 'get',
      url: uri,
      responseType: 'json'
    }
    const { data } = await axios(requestOptions)
    const countries = Object.values(data)
    const listCountries = countries.map(item => {
      return {
        name: item.name,
        alpha3code: item.alpha3Code || '-',
        timezones: item.timezones[0] || '-',
        callingcodes: item.callingCodes[0] || '-'
      }
    })

    try {
      const database = await initDataBase(sequelizeConfig)
      listCountries.forEach(country => {
        database.sequelize.query(createCountry(),
          {
            replacements:
          {
            name: country.name,
            alpha3code: country.alpha3code,
            timezones: country.timezones,
            callingcodes: country.callingcodes
          },
            type: QueryTypes.INSERT
          })
      })

      res.status(201).json({ success: true })
    } catch (error) {
      res.status(204).json({ success: false })
    }
  }

}
