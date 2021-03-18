const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = db.users
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.EMAIL_API_KEY)

const userController = {
  listUsers: async (req, res) => {
    const users = await userModel.findAll({})
    if (users) {
      res.status(200).json({ success: true, users })
    } else {
      res.status(400).json({ success: false, error: 'Error en la consulta' })
    }
  },

  /* ESTO ES UN PSEUDO REGISTRO PORQUE REALMENTE LA CUENTA SOLO SE GUARDA UNA VEZ QUE SE CONFIRMA EL TOKEN */
  register: async (req, res) => {
    const token = jwt.sign({ data: `${req.body.username},${req.body.email},${req.body.password}` }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: req.body.email,
      subject: 'Account activation link',
      html: `
                <h2>Please click into link to activate!</h2>
                <hr/>
                <a href=${process.env.CLIENT_URL}/users/activation/${token} target="_self">Click me for activate account!</a>
                <p>${token}</p>
                <hr/>
                <p>This email containt sentive info</p>
            `
    }

    const user = await userModel.findAll({
      where: { email: req.body.email },
      attributes: {
        // exclude: ['password', "RESETPASSWORDLINK","ISACTIVE"]
      }
    })

    if (!user[0]) {
      sgMail.send(emailData).then(sent => {
        return res.status(200).json({
          message: `Email has been sent to ${req.body.email}`,
          success: true
        })
      }).catch(err => res.status(400).json({ error: err, success: false }))
    } else {
      res.status(400).json({ success: true, message: `there is already an account registered with the mail: ${req.body.email}` })
    }
  },

  /** SI EL TOKEN NO HA EXPIRADO ENTONCES LA CUENTA SE REGISTA Y ALMACENA Y EL USUARIO QUEDA ACTIVADO */
  activation: (req, res) => {
    const token = req.body.token

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(400).json({ success: false, message: 'your token is invalid or has expired, signup again' })
        } else {
          const info = decoded.data.split(',')

          const data = {
            username: info[0],
            email: info[1],
            password: info[2]
            // TOKEN: "", /**revisar luego esto */
            // ISACTIVE: true
          }

          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash
            if (err) {
              res.status(400).json({ success: false, message: 'An error has occurred to try save encrypt password' })
            } else {
              userModel.create(data)
                .then(user => {
                  if (user) {
                    res.status(201).json({ user, success: true, message: 'your account has been registered successfully' })
                  }
                })
                .catch(err => {
                  res.status(400).json({ success: false, message: 'An error has occurred to try create user', err })
                })
            }
          })
        }
      })
    } else {
      res.status(400).json({ success: false, message: 'token not found' })
    }
  },

  forgotPassword: async (req, res) => {
    const email = req.body.email
    const user = await userModel.findAll({ where: { email } })

    if (user[0]) {
      const token = jwt.sign({ data: `${user[0].email}` }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' })

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Resset Password link',
        html: `
                <h2>Please click into link to reset password!</h2>
                <hr/>
                <a href=${process.env.CLIENT_URL}/reset/password/${token}>Reset your Password</a>
                <hr/>
                <p>This email containt sentive info</p>
            `
      }

      await userModel.update({ reset_password: token }, { where: { id_user: user[0].id_user } })
        .then(result => {
          if (result) {
            sgMail.send(emailData).then(sent => {
              return res.json({ success: true, message: 'A link has been sent to your email to establish a new password.', user })
            }).catch(err => res.status(200).json({ error: err }))
          } else {
            res.json({ success: false, message: 'Dont save' })
          }
        }).catch(err => {
          console.log(err)
          res.json({ success: false, message: 'Something wrong' })
        })
    } else {
      res.json({ message: `this email account: ${email} is not registered.`, success: false })
    }
  },

  resetPassword: async (req, res) => {
    const { password1, token } = req.body

    const user = await userModel.findAll({ where: { reset_password: token } })

    if (user[0]) {
      bcrypt.hash(password1, 10, (err, hash) => {
        const password = hash
        if (err) {
          res.status(200).json({ success: false, message: 'An error has occurred to try save encrypt password' })
        } else {
          userModel.update({ password, reset_password: '' }, { where: { id_user: user[0].id_user } })
          res.json({ success: true, message: 'your password has changed, Sign In please' })
        }
      })
    } else {
      res.json({ success: false, message: 'Something wrong, try again' })
    }
  },

  login: async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    const user = await userModel.findAll({ where: { email: data.email } })

    if (user[0]) {
      if (bcrypt.compareSync(data.password, user[0].password)) {
        const token = jwt.sign({ username: `${user[0].USERNAME}` }, process.env.JWT_SECRET_KEY, { expiresIn: '8h' })
        res.status(200).json({ success: true, user: user[0], token, message: 'ok' })
      } else {
        res.json({ success: false, message: 'Your password is incorrect' })
      }
    } else {
      res.json({ success: false, message: `this email account: ${data.email} is not registered. Please Sign Up` })
    }
  },

  delete: async (req, res) => {
    await userModel.destroy({ where: { id_user: 1 } })
    res.json({ sucess: true })
  }
}

module.exports = userController
