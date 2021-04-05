const { sequelizeConfig, constants } = require('../config/index')
const { initDataBase } = require('../models/')
const bcrypt = require('bcrypt')
const { PASSWORD_SECRET, ACCESS_TOKEN_SECRET } = require('../config/vars.config')
const representativeController = require('./representative.controller')
const jwt = require('jsonwebtoken')
const { getPermission } = require('../queries/permission.queries')
const { QueryTypes } = require('sequelize')
/**
 * @module authController controlador de registro y autenticacion de usuarios
 */
const authController = {
  register: async (newUser) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const user = await database.bo_user.findAll({ where: { EMAIL: newUser.EMAIL } })
      if (!user[0]) {
        try {
          const data = {
            EMAIL: newUser.EMAIL,
            PASSWORD: newUser.PASSWORD,
            RESETPASSLINK: '-',
            SHOULDRESETPASS: 0,
            CREATED_AT: constants.NOW(),
            FK_COMMERCE: newUser.FK_COMMERCE,
            FK_PROFILE: newUser.FK_PROFILE
          }

          const hash = bcrypt.hashSync(data.PASSWORD, 10, PASSWORD_SECRET)
          data.PASSWORD = hash

          const user = await database.bo_user.create(data)

          const representativeInfo = {
            FK_BO_USER: user.IDBO_USER,
            FULLNAME: newUser.FULLNAME,
            POSITION: newUser.POSITION,
            CREATED_AT: constants.NOW()
          }

          const { success, message, representative } = await representativeController.create(representativeInfo)

          if (success) {
            return ({ user, representative, success, message: 'created is ok' })
          } else {
            return ({ success, message })
          }
        } catch (error) {
          return ({ success: false, message: error })
        }
      } else {
        return ({ success: false, message: 'account is already in use' })
      }
    } catch (error) {
      return ({ success: false, message: error })
    }
  },

  login: async (credentials) => {
    try {
      const database = await initDataBase(sequelizeConfig)
      const user = await database.bo_user.findAll({
        where: { EMAIL: credentials.EMAIL },
        attributes: { exclude: ['RESETPASSLINK', 'SHOULDRESETPASS', 'CREATED_AT', 'UPDATED_AT', 'DISABLED_AT'] },
        include: [
          {
            model: database.commerce_representative_info,
            attributes: { exclude: ['EMAIL', 'FK_BO_USER', 'CREATED_AT', 'UPDATED_AT'] }
          },
          {
            model: database.commerce,
            attributes: { exclude: ['IDCOMMERCE', 'LENGTH', 'LATITUDE', 'ZIP_CODE'] }
          },
          {
            model: database.profile
          }
        ]
      })

      const response = await database.sequelize.query(getPermission(user[0].IDBO_USER), { type: QueryTypes.SELECT })

      console.log(response)

      if (user[0]) {
        if (bcrypt.compareSync(credentials.PASSWORD, user[0].PASSWORD)) {
          const token = jwt.sign({ id: `${user[0].IDBO_USER}`, permission: `${response[0].PERMISSION}`, rol: `${user[0].profile.PROFILE}` }, ACCESS_TOKEN_SECRET)
          return ({ user: { user }, token, success: true, message: 'User has found' })
        } else {
          return ({ success: false, message: 'password is not recognized ' })
        }
      } else {
        return ({ success: false, message: 'User record not found' })
      }
    } catch (error) {
      return ({ message: 'User record not found', success: false })
    }
  }
}

module.exports = authController
