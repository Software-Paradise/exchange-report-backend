const { getServerBaseURL, encrypt, decrypt } = require('../utils/tools')
const { NOW } = require('../config/constants.config')
const log = require('../logs/log.config')

const { GCLOUD_FILES_STORAGE_BUCKET,
GCLOUD_ACCOUNT_SERVICE_CREDENTIAL} = require('../config/vars.config')

//GCLOUD STORAGE CLIENT
const { Storage } = require('@google-cloud/storage')

//INSTANCIA DEL BUCKET
const bucket = new Storage({
    keyFilename: GCLOUD_ACCOUNT_SERVICE_CREDENTIAL,
}).bucket(GCLOUD_FILES_STORAGE_BUCKET)

const generateURLImage = async (httpRequest, infoFile) => {

    try {

        const baseURL = getServerBaseURL(httpRequest)

        const currentTime = new Date(NOW()).getTime()

        // calcule expire time for file key
        const toExpire = 1000 * 60 * 60 * 12
        const expireTime = currentTime + toExpire

        // create file key
        const fileKey = await encrypt({
            infoFile,
            exp: expireTime,
        })

        /**DIRECCION PARA DESCARGA DE LA IMAGEN DESDE EL BACKEND */
        const URL = `/alypay/auth/profile_picture/${fileKey}`
        /**SE FORMA LA URL COMPLETA QUE TENDRA LA IMAGEN DE PERFIL */
        const pictureURL = URL ? baseURL + URL : null

        return ({ generate: true, pictureURL, msg: '' })

    } catch (error) {
        log(`bucket.service.js | Error al generar la URL de la imagen | ${error}`)
        return ({ generate: false, pictureURL: '', msg: error })
    }

}

/**
 * @author devNica / Alvaro Gonzalez
 * @param {Object} fileKey
 * @description Controlador que realizar la descarga de una imagen del Bucket, mediante la desencriptacion del parametro en la URL
 */
const downloadImageFromUrl = async (fileKey) => {

    try {

        // get current time
        const currentTime = new Date(NOW()).getTime()

        const rawData = await decrypt(fileKey)

        // decode key and extract data
        const decode = JSON.parse(rawData)

        const { exp, infoFile: { filename, fileType } } = decode

        // check if key is expired
        if (currentTime > exp) {
            throw String('Expire')
        }

        const blob = bucket.file(filename)

        // Verificando si el archivo existe en el bucket
        blob.exists()
            .catch(error => {
                throw String(error)
            })

        //Se carga el archivo desde el bucket y se envía el buffer como respuesta
        const data = await blob.download()

        return ({
            service: true,
            response: {
                header: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': fileType,
                    'Content-Length': data.length,
                },

                data: data[0],
            },
        })

    } catch (error) {
        log(`bucket.service.js | Error al descargar la imagen desde la URL | ${error}`)
        return ({ service: false, response: {}, message: error })
    }

}


module.exports = {
    generateURLImage,
    downloadImageFromUrl
}