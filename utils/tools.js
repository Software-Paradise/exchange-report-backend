const url = require('url')
const { SHA256 } = require('crypto-js')
const crypto = require('crypto')

const { JWTSECRET } = require('../config/vars.config')
const { contract } = require('../config/constants.config')

const iv = Buffer.alloc(16, 0)
const ALGORITHM = 'aes-192-cbc'


const getServerBaseURL = (request) => {
    if (!request) {
        return ''
    }

    // get server url
    const baseURL = url.format({
        protocol: request.protocol,
        port: request.port,
        host: request.get('host'),
    })

    return baseURL
}

/**UTILIZADAD PARA ENCRIPTAR UN OBJETO*/
const encrypt = async (_data = {}, KEY = JWTSECRET) =>
    new Promise(async (resolve, reject) => {
        try {
            const ENCRYPTION_KEY = crypto.scryptSync(
                SHA256(contract, KEY).toString(),
                'salt',
                24
            )

            // Data to encrypt
            const object = JSON.stringify(_data)

            const cipher = await crypto.createCipheriv(
                ALGORITHM,
                ENCRYPTION_KEY,
                iv
            )

            let crypted = cipher.update(object, 'utf8', 'hex')

            crypted += cipher.final('hex')

            resolve(crypted)
        } catch (error) {
            reject(error.toString())
        }
})

const decrypt = (text = '', KEY = JWTSECRET) =>
    new Promise((resolve, reject) => {
        try {
            const ENCRYPTION_KEY = crypto.scryptSync(
                SHA256(contract, KEY).toString(),
                'salt',
                24
            )

            const deciper = crypto.createDecipheriv(
                ALGORITHM,
                ENCRYPTION_KEY,
                iv
            )
            let decrypt = deciper.update(text, 'hex', 'utf8')

            decrypt += deciper.final('utf8')
            resolve(decrypt)
        } catch (error) {
            reject(error.toString())
        }
})


module.exports = {
    getServerBaseURL,
    encrypt,
    decrypt
}