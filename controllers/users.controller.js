const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = db.users
const { JWT_SECRET} = require("../config/vars.config")

/**
 * @module userController - controlador de cuentas de usuario
 */
const userController = {
  
  /**
   * 
   * @returns {Object} Objeto con todos los usuario encontrados
   */
  listUsers: async () => {
    const users = await userModel.findAll({})
    return ({users})
  },

  /**
   * 
   * @param {Object} data Objeto que contiene los datos del usuario que se va registrar
   * @returns {boolean} Retorna el estado de la solicitud al controlador
   * @returns {string} Retorna un mensaje
   */
  register:  async (data) => {

    let user = await userModel.findAll({where: {email: data.email}})

    if(!user[0]){
        try {
          let hash = bcrypt.hashSync(data.password, 10)
          data.password = hash;

          try {
            await userModel.create(data)
            return ({success: true, message: `Cuenta registrada satisfactoriamente`})
          } catch (error) {
            return ({success: false, message: `Error: ${error}`})
          }

        } catch (error) {
            return ({success: false, message: error})  
        }

    }else{
      return ({success: true, message: `La cuenta de usuario con correo: ${data.email}, ya esta registrada`})
    }
  
  },


  /**
   * 
   * @param {Object} credential - Objeto que contiene las credenciales del usuario
   * @returns {Object}  Objeto que contiene los atributos del usuario (verificado) y el token de sesion
   */
  login: async (credential) => {
    
    const user = await userModel.findAll({ where: { email: credential.email } })

    if (user[0]) {
      if (bcrypt.compareSync(credential.password, user[0].password)) {
        const token = jwt.sign({ username: `${user[0].USERNAME}` }, JWT_SECRET, { expiresIn: '8h' })
        return ({ success: true, user: user[0], token, message: 'ok' })
      } else {
        return ({ success: false, message: 'Su contraseña es incorrecta' })
      }
    } else {
      return ({ success: false, message: `La cuenta de correo: ${credential.email} no esta registrada` })
    }
  },

  
}

module.exports = userController
