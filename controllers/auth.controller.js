const { sequelizeConfig, constants } = require('../config/index')
const { initDataBase } = require('../models/')
const bcrypt = require('bcrypt')
const { PASSWORD_SECRET, ACCESS_TOKEN_SECRET } = require('../config/vars.config')
const jwt = require('jsonwebtoken')
const mailService = require('../services/mail.service')
const { createValidator, loginValidator } = require('../validators/users.validator')
const path = require('path')
const base64img = require('../utils/base64')

/**
 * @module authController controlador de registro y autenticacion de usuarios
 */
const authController = {
  register: async (req, res) => {
    if (createValidator(req.body)) {
      try {
        const { user, agentinfo, admin } = req.body
        const database = await initDataBase(sequelizeConfig)
        const exist = await database.bo_user.findAll({ where: { EMAIL: user.email } })

        if (!exist[0]) {
          const newUser = {
            EMAIL: user.email,
            PASSWORD: user.password,
            BOCOMISSION: user.commission,
            SHOULDRESETPASS: 1,
            CREATED_AT: constants.NOW(),
            FK_COMMERCE: user.idcommerce,
            FK_PROFILE: user.idprofile
          }

          const hash = bcrypt.hashSync(user.password, 10, PASSWORD_SECRET)
          newUser.PASSWORD = hash

          try {
            await database.sequelize.transaction(async (_) => {
              const user = await database.bo_user.create(newUser)
              const agentInfo = {
                FK_BOUSER: user.IDBO_USER,
                FULLNAME: agentinfo.fullname,
                ADDRESS: agentinfo.address,
                PHONE: agentinfo.phone,
                POSITION: agentinfo.position,
                DNI: agentinfo.dni,
                CREATED_AT: constants.NOW()
              }
              await database.agent_info.create(agentInfo)
            })
          } catch (error) {
            return res.json({ success: false, message: error.errors[0].message }).status(401)
          }

          const pngpath1 = path.resolve('./assets', 'ALYEXCHANGE.png')
          const pngpath2 = path.resolve('./assets', 'POWERED.png')
          const MAINLOGO = base64img.base64Sync(pngpath1)
          const FOOTLOGO = base64img.base64Sync(pngpath2)

          const sendData = {
            from: 'test@alyexchange.com',
            to: user.email,
            subject: 'Correo de Invitacion AlyExchange',
            FULLNAME: agentinfo.fullname,
            EMAIL: user.email,
            PASSWORD: user.password,
            URL: 'http://www.alysistem.com/alyexchange/login',
            COMMERCE: admin.commerce,
            USERADMIN: admin.useradmin,
            MAINLOGO,
            FOOTLOGO
          }

          await mailService.sendInvitationPDF(sendData)

          return res.json({ success: true, message: 'mail has been sent with user credentials' }).status(201)
        } else {
          return res.json({ success: false, message: 'Account is already in use' }).status(401)
        }
      } catch (error) {
        return res.json({ success: false, message: `Something wrong: ${error}` }).status(401)
      }
    } else {
      return res.sendStatus(400)
    }
  },

  login: async (req, res) => {
    if (loginValidator(req.body)) {
      try {
        const database = await initDataBase(sequelizeConfig)

        const { credentials } = req.body

        const user = await database.bo_user.findAll({
          where: { EMAIL: credentials.email },
          attributes: { exclude: ['CREATED_AT', 'UPDATED_AT', 'DISABLED_AT'] },
          include: [
            {
              model: database.agent_info,
              attributes: { exclude: ['DNI', 'PASSPORT', 'ADDRESS'] }
            },
            {
              model: database.commerce,
              attributes: { exclude: ['IDCOMMERCE', 'ADDRESS', 'PHONE', 'POSTAL_CODE', 'LENGTH', 'LATITUDE', 'ZIP_CODE'] }
            },
            {
              model: database.profile
            }
          ]
        })

        if (user?.[0]) {
          if (bcrypt.compareSync(credentials.password, user[0].PASSWORD)) {
            const token = jwt.sign({ id: `${user[0].IDBO_USER}`, rol: `${user[0].profile.PROFILE}` }, ACCESS_TOKEN_SECRET)
            res.json({ user: { user }, token, success: true, message: 'User has found' })
          } else {
            return res.json({ success: false, message: 'Incorrect password' })
          }
        } else {
          return res.json({ success: false, message: 'User record not found' })
        }
      } catch (error) {
        return res.json({ success: false, message: 'User record not found' })
      }
    } else {
      return res.sendStatus(400)
    }
  }
}

module.exports = authController
