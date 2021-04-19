module.exports = {
  createCountry: () => {
    return 'INSERT INTO countries (`NAME`, `ALPHA3CODE`, `TIMEZONES`, `CALLINGCODES`) VALUES (:name, :alpha3code, :timezones, :callingcodes)'
  }
}
