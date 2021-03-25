const router = require('express').Router();
const {walletController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index')

/**
 * @module walletRoutes Wallets Router
 * @param {*} app Instancia del Framework de Express
 */
module.exports = (app)=>{
    app.use('/wallets', router);

    /** 
     * Wallet list Route
     * @route {GET} /wallets/list
     * @authentication Esta requiere autenticacion de token 
     * 
    */
    router.get('/list', authentication, async (_, res)=>{
        const {success, message, wallets} = await walletController.listWallets()

        if(success){
            res.json({success, message, wallets}).status(200)
        }else{
            res.json({success, message}).status(400)
        }
    })


    /** 
     * Wallet list Route
     * @route {POST} /wallets/create
     * @authentication Esta requiere autenticacion de token 
     * 
    */
    router.post('/create', authentication, async (req, res)=>{
        
        if(!req.body.newWallet){
            const {success, message, newWallet} = await walletController.create(newCoin);

            if(success){
                res.json({success, message, newWallet}).status(201)
            }else{
                res.json({success, message}).status(400)
            }
        }else{
            res.json({success: false, message: 'No se recibio contenido en el request de la consulta HTTP'}).status(204)
        }
    })

}