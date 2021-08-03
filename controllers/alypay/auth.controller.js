const { SHA256 } = require('crypto-js')
const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alypay_models')
const { userLogin } = require('../../queries/alypay/storedprocedures.sql')
const { getProfilePictureInfo } = require('../../queries/alypay/customizedqueries.sql')
const { QueryTypes } = require('sequelize')
const { generateURLImage, downloadImageFromUrl } = require('../../services/bucket.service')
const log = require('../../logs/log.config')

const conn = async () => {
    return await initDataBase(sequelizeConfig[1])
}

const { JWTSECRET } = require('../../config/vars.config')


/**
 * @author devNica | Alvaro Gonzalez
 * @description controlador de inicio de sesion
 * @param {Objtec} req 
 * @param {Object} res 
 */
const login = async (req, res) => {

    try {

        const db = await conn()

        const {
            email,
            password,
            public_ip,
            device,
            mac_adress,
            system_name,
            active_sesion
        } = req.body

        //encriptar el password que proviene de la peticion http
        const passwordEncrypt = SHA256(password, JWTSECRET).toString()

        const rplm = {
            email,
            passwordEncrypt,
            public_ip,
            device,
            mac_address: mac_adress,
            system_name
        }

        const userLoggedIn = await db.sequelize.query(userLogin(), { replacements: rplm })

        //OBTIENE LA INFORMACION DE LA IMAGEN DEL USUARIO LOGUEADO
        const pictureProfileInfo = await db.sequelize.query(getProfilePictureInfo(), {replacements: {id: userLoggedIn[0].id}, type: QueryTypes.SELECT })
        //SE GENERAL LA URL PARA DESCARGAR LA IMAGEN DESDE EL BUCKET DE GOOGLE
        
        const { pictureURL } = await generateURLImage(req, { filename: pictureProfileInfo[0].filename, fileType: pictureProfileInfo[0].filetype })
        //SE AGREGA AL OBJETO DATA EL ATRIBUTO SRC PARA QUE SEA CONSUMIDO EN LAS APLICACIONES Y SE LE PASA EL VALOR DEL URL
        
        console.log('url de imagen generada', pictureURL)

        const user = userLoggedIn[0]
        user.src = pictureURL

        return res.send({login: true, user })

        
    } catch (error) {
        log(`auth.controller.js | Login Error | ${error}`)
        res.send({error: true, message: error})
    }

}


/**
 * 
 * @author devNica | Alvaro Gonzalez
 * @description Controlador que realiza la descarga de la imagen del perfil por medio de un filekey
 */
const downloadProfilePicture = async (req, res) => {
        
        const { fileKey } = req.params

        try {
            //VALIDAR QUE SE RECIBA EN LOS PARAMS UN FILEKEY VALIDO
            if(fileKey !== null && fileKey !== undefined){
                /**
                 * SE LLAMA AL SERVICIO QUE SE ENCARGA DE OBTENER EL DATA Y HEADERS DE 
                 * LA IMAGEN, RECIBIENDO COMO PARAMETRO EL FILEKEY QUE TIENE ENCRIPTADO
                 * EL FILENAME Y EL MIMETYPE DEL ARCHIVO QUE VA SER DESCARGADO
                 */
                const {service, response, message} = await downloadImageFromUrl(fileKey)

                /**
                 * SI EL SERVICIO FALLA SE NOTIFICA A LA APLICACION
                 */
                if(service) {
                    //SE DESTRUCTURA LA RESPUESTA DEL SERVICIO
                    const { header, data } = response
                    res.set(header)
                    res.send(data)
                } else throw message
            
            } else throw String('fileKey es requerido')

        } catch (error) {
            console.log(error)
            log(`auth.controller.js | Download Profile Picture | ${error}`)
            res.send({error: true, message:  error})
        }
}

module.exports = {
    login,
    downloadProfilePicture
}