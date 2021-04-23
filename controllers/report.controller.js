const { sequelizeConfig } = require('../config/index')
const { initDataBase } = require('../models/')
const { Op } = require('sequelize')
const { format, utcToZonedTime } = require('date-fns-tz')
const mailService = require('../services/mail.service')
const path = require('path')
const base64img = require('../utils/base64')
const { paramsValidator } = require('../validators/general.validator')

module.exports = {
  ReportByid: async (req, res) => {
    const filter = req.filter || {}
    console.log('filter:', filter)
    if (paramsValidator(req.params)) {
      try {
        const database = await initDataBase(sequelizeConfig)
        const report = await database.transaction_history_view.findOne({
          where: {
            [Op.and]: [
              { IDTRANSACTION: req.params.id },
              filter
            ]
          },
          attributes: [
            'AGENT_FULLNAME', 'CUSTOMER_FULLNAME', 'COUNTRY', 'CITY', 'CUSTOMER_EMAIL',
            'CREATED_AT', 'TRANSACTION_TYPE', 'ORIGIN_SYMBOL', 'DESTINATION_SYMBOL',
            'ORIGIN_CURRENCY', 'DESTINATION_CURRENCY', 'AMOUNT_FROM', 'AMOUNT_TO',
            'CVC_FROM', 'CVC_TO', 'BNS_COMMISSION_USD', 'BNS_COMMISSION_CRYPTO', 'EXE_USD', 'EXE_CRYPTO'
          ]
        })

        let context

        if (report?.AGENT_FULLNAME) {
          const date = new Date(report.CREATED_AT)
          const nicTimeZone = 'America/Managua'

          const ncDate = utcToZonedTime(date, nicTimeZone)

          const pngpath1 = path.resolve('./assets', 'ALYEXCHANGE.png')
          const pngpath2 = path.resolve('./assets', 'POWERED.png')
          const MAINLOGO = base64img.base64Sync(pngpath1)
          const FOOTLOGO = base64img.base64Sync(pngpath2)

          if (report?.TRANSACTION_TYPE && report.TRANSACTION_TYPE === 'Venta') {
            context = {
              AGENT_FULLNAME: report.AGENT_FULLNAME,
              CUSTOMER_FULLNAME: report.CUSTOMER_FULLNAME,
              DATETIME: format(ncDate, 'dd/MM/yyyy | HH:mm:ss p', { timeZone: 'America/Managua' }),
              ORIGIN_CURRENCY: report.ORIGIN_CURRENCY,
              BNS_COMMISSION_USD: report.BNS_COMMISSION_USD + ' ' + report.DESTINATION_SYMBOL,
              BNS_COMMISSION_CRYPTO: report.BNS_COMMISSION_CRYPTO + ' ' + report.ORIGIN_SYMBOL,
              EXE_CRYPTO: report.EXE_CRYPTO + ' ' + report.ORIGIN_SYMBOL,
              EXE_USD: report.EXE_USD + ' ' + report.DESTINATION_SYMBOL,
              LOCALITY: report.CITY + ' | ' + report.COUNTRY,
              TRANSACTION_TYPE: report.TRANSACTION_TYPE,
              CURRENT_VALUE: report.CVC_FROM + ' ' + report.DESTINATION_SYMBOL,
              MAINLOGO,
              FOOTLOGO
            }
          } else {
            context = {
              AGENT_FULLNAME: report.AGENT_FULLNAME,
              CUSTOMER_FULLNAME: report.CUSTOMER_FULLNAME,
              DATETIME: format(ncDate, 'dd/MM/yyyy | p', { timeZone: 'America/Managua' }),
              ORIGIN_CURRENCY: report.ORIGIN_CURRENCY,
              BNS_COMMISSION_USD: report.BNS_COMMISSION_USD + ' ' + report.ORIGIN_SYMBOL,
              BNS_COMMISSION_CRYPTO: report.BNS_COMMISSION_CRYPTO + ' ' + report.DESTINATION_SYMBOL,
              EXE_CRYPTO: report.EXE_CRYPTO + ' ' + report.DESTINATION_SYMBOL,
              EXE_USD: report.EXE_USD + ' ' + report.ORIGIN_SYMBOL,
              LOCALITY: report.CITY + ' | ' + report.COUNTRY,
              TRANSACTION_TYPE: report.TRANSACTION_TYPE,
              CURRENT_VALUE: report.CVC_FROM + ' ' + report.ORIGIN_SYMBOL,
              MAINLOGO,
              FOOTLOGO
            }
          }

          const data = {
            headers: {
              from: 'test@alyexchange.com',
              to: 'designsdevnicaragua@gmail.com',
              subject: 'Correo de Invitacion AlyExchange'
            },
            context
          }

          try {
            await mailService.sendInvoice(data)
            return res.json({ success: true, message: 'Your invoice has been sent' }).status(200)
          } catch (error) {
            return res.json({ success: false, message: 'Attachment was not sent' }).status(400)
          }
        }
        return res.json({ success: true, message: 'You can´t not generate this report' }).status(200)
      } catch (error) {
        console.log(error)
        return res.json({ success: false, message: 'Something wrong' }).status(400)
      }
    }
  }
}
