const dotenv = require('dotenv')

// loading vars from .env
dotenv.config()

module.exports = {
  PORT: process.env.PORT || 8080,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET || 'secret',
  JWT_SECRET: process.env.JWTSECRET || 'secret',
  
  DB1: {
    NAME: process.env.DBNAME1,
    HOST: process.env.DBHOST || 'localhost',
    USERNAME: process.env.DBUSERNAME,
    PASSWORD: process.env.DBPASSWORD,
    DIALECT: process.env.DBDIALECT || 'mysql'
  },

  DB2: {
    NAME: process.env.DBNAME2,
    HOST: process.env.DBHOST || 'localhost',
    USERNAME: process.env.DBUSER,
    PASSWORD: process.env.DBPASS,
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

  CLIENT_URL: process.env.CLIENT_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  JWTSECRET: process.env.JWTSECRET,
  JWTSECRETSIGN: process.env.JWTSECRETSIGN,

  GCLOUD_FILES_STORAGE_BUCKET: process.env.GCLOUD_FILES_STORAGE_BUCKET,
  GCLOUD_ACCOUNT_SERVICE_CREDENTIAL: `config/${process.env.GCLOUD_ACCOUNT_SERVICE_CREDENTIAL}`,

}
