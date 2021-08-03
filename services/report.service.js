const { format, utcToZonedTime } = require('date-fns-tz')
const path = require('path')
const base64img = require('../utils/base64')
const { sendInvoice } = require('./mail.service')

const validateData = (data) => {
  if (data?.AGENT_FULLNAME &&
    data?.CUSTOMER_FULLNAME &&
    data?.COUNTRY &&
    data?.CITY &&
    data?.CUSTOMER_EMAIL &&
    data?.CREATED_AT &&
    data?.TRANSACTION_TYPE &&
    data?.ORIGIN_SYMBOL &&
    data?.DESTINATION_SYMBOL &&
    data?.ORIGIN_CURRENCY &&
    data?.DESTINATION_CURRENCY &&
    data?.AMOUNT_FROM &&
    data?.AMOUNT_TO &&
    data?.CVC_FROM &&
    data?.CVC_TO &&
    data?.BNS_COMMISSION_USD &&
    data?.BNS_COMMISSION_CRYPTO &&
    data?.EXE_USD &&
    data?.EXE_CRYPTO) return true
  else return false
}

module.exports = {
  sendReport: async (data) => {
    if (validateData(data)) {
      const date = new Date(data.CREATED_AT)
      const nicTimeZone = 'America/Managua'

      const ncDate = utcToZonedTime(date, nicTimeZone)

      const pngpath1 = path.resolve('./assets', 'ALYEXCHANGE.png')
      const pngpath2 = path.resolve('./assets', 'POWERED.png')
      const MAINLOGO = base64img.base64Sync(pngpath1)
      const FOOTLOGO = base64img.base64Sync(pngpath2)

      let context = {}

      if (data.TRANSACTION_TYPE === 'Venta') {
        context = {
          AGENT_FULLNAME: data.AGENT_FULLNAME,
          CUSTOMER_FULLNAME: data.CUSTOMER_FULLNAME,
          CREATED_AT: format(ncDate, "dd/MM/yyyy | hh:mm aaaaa'm'", { timeZone: 'America/Managua' }),
          ORIGIN_CURRENCY: data.ORIGIN_CURRENCY,
          BNS_COMMISSION_USD: data.BNS_COMMISSION_USD + ' ' + data.DESTINATION_SYMBOL,
          BNS_COMMISSION_CRYPTO: data.BNS_COMMISSION_CRYPTO + ' ' + data.ORIGIN_SYMBOL,
          EXE_CRYPTO: data.EXE_CRYPTO + ' ' + data.ORIGIN_SYMBOL,
          EXE_USD: data.EXE_USD + ' ' + data.DESTINATION_SYMBOL,
          LOCALITY: data.CITY + ' | ' + data.COUNTRY,
          TRANSACTION_TYPE: data.TRANSACTION_TYPE,
          CURRENT_VALUE: data.CVC_FROM + ' ' + data.DESTINATION_SYMBOL,
          MAINLOGO,
          FOOTLOGO
        }
      }

      if (data.TRANSACTION_TYPE === 'Exchange') {
        context = {
          AGENT_FULLNAME: data.AGENT_FULLNAME,
          CUSTOMER_FULLNAME: data.CUSTOMER_FULLNAME,
          CREATED_AT: format(ncDate, "dd/MM/yyyy | hh:mm aaaaa'm'", { timeZone: 'America/Managua' }),
          ORIGIN_CURRENCY: data.ORIGIN_CURRENCY,
          BNS_COMMISSION_USD: data.BNS_COMMISSION_USD + ' ' + data.DESTINATION_SYMBOL,
          BNS_COMMISSION_CRYPTO: data.BNS_COMMISSION_CRYPTO + ' ' + data.ORIGIN_SYMBOL,
          EXE_CRYPTO: data.EXE_CRYPTO + data.DESTINATION_SYMBOL,
          EXE_USD: data.EXE_USD + ' ' + 'USD',
          LOCALITY: data.CITY + ' | ' + data.COUNTRY,
          TRANSACTION_TYPE: data.TRANSACTION_TYPE,
          CURRENT_VALUE: data.CVC_FROM + ' ' + data.DESTINATION_SYMBOL,
          MAINLOGO,
          FOOTLOGO
        }
      }

      if (data.TRANSACTION_TYPE === 'Compra') {
        context = {
          AGENT_FULLNAME: data.AGENT_FULLNAME,
          CUSTOMER_FULLNAME: data.CUSTOMER_FULLNAME,
          CREATED_AT: format(ncDate, "dd/MM/yyyy | hh:mm aaaaa'm'", { timeZone: 'America/Managua' }),
          ORIGIN_CURRENCY: data.ORIGIN_CURRENCY,
          BNS_COMMISSION_USD: data.BNS_COMMISSION_USD + ' ' + data.ORIGIN_SYMBOL,
          BNS_COMMISSION_CRYPTO: data.BNS_COMMISSION_CRYPTO + ' ' + data.DESTINATION_SYMBOL,
          EXE_CRYPTO: data.EXE_CRYPTO + ' ' + data.DESTINATION_SYMBOL,
          EXE_USD: data.EXE_USD + ' ' + data.ORIGIN_SYMBOL,
          LOCALITY: data.CITY + ' | ' + data.COUNTRY,
          TRANSACTION_TYPE: data.TRANSACTION_TYPE,
          CURRENT_VALUE: data.CVC_FROM + ' ' + data.ORIGIN_SYMBOL,
          MAINLOGO,
          FOOTLOGO
        }
      }

      const inoviceData = {
        headers: {
          from: 'test@alyexchange.com',
          to: 'designsdevnicaragua@gmail.com',
          subject: 'Comprobante de Transaccion AlyExchange'
        },
        context
      }

      try {
        return { success, message } = await sendInvoice(inoviceData)
      } catch (error) {
        return ({ success: false, message: error })
      }
    } else {
      return ({ success: false, message: 'No se encontro uno de los atributos de la data' })
    }
  }
}
