const dotenv = require('dotenv')

// loading vars from .env
dotenv.config()

module.exports = {
  PORT: process.env.PORT || 8080,
  PASSWORD_SECRET: process.env.PASSWORDSECRET || 'secret',
  JWT_SECRET: process.env.JWTSECRET || 'secret',
  DB: {
    NAME: process.env.DBNAME,
    HOST: process.env.DBHOST || 'localhost',
    USERNAME: process.env.DBUSERNAME,
    PASSWORD: process.env.DBPASSWORD,
    DIALECT: process.env.DBDIALECT || 'mysql'
  },
  MAILGUN_APIKEY: process.env.MAILGUN_APIKEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

  EMAIL: {
    API_URL: process.env.API_URL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    SUBJECT: process.env.SUBJECT
  },

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET

}
