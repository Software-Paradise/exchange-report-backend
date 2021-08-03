const moment = require('moment')

/**
 * Constante que retorna la hora del servidor con la diferencia entre hora UTC y la hora local
 */
const NOW = () => {
  const now = new Date()

  // Constante que devuelve la diferencia horaria entre la hora UTC y la hora local, en minutos.
  // 360 min / en produccion no funciona el `getTimezoneOffset`
  // const timeMinutesOffset = 360
  const timeMinutesOffset = moment().toDate().getTimezoneOffset() * 2

  // convertimos en timestap el tiempo
  const timePast = moment(now).subtract(timeMinutesOffset, 'minutes').toDate()

  return timePast
}

/**
 * Contrato para algoritmos de billetera
 */
const contract = '0x6e72ef58284af3b858e73a17fdb4564cbe13fc70'

module.exports = {
  NOW,
  contract
}