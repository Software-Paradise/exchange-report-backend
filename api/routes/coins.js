const router = require('express').Router();
const {coinsController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index');

/**
 * 
 * @param {*} app Instancia del Framework Express
 */
module.exports = (app)=>{
    app.use('/coins', router);


    /** 
     * Coin List Route
     * @route {GET} /coins/list
     * @authentication Esta requiere autenticacion de token 
     * 
    */
    router.get('/list/', authentication, async (_, res)=>{
        const {success, message, typeCoin} = await coinsController.listCoin()
        if(success){
            res.json({typeCoin, success}).status(200)
        }else{
            res.json({message, success}).status(400)
        }
    })
    
    /** 
     * Coin Create Route
     * @route {POST} /coins/list
     * @authentication Esta requiere autenticacion de token 
     * 
    */
    router.post('/create', authentication, async (req, res)=>{
        
        const newCoin = {
            description: req.body.description,
            symbol: req.body.symbol
        }

        const {success, message} = await coinsController.create(newCoin);

        if(success){
            res.json({success, message}).status(201)
        }else{
            res.json({message, success}).status(400)
        }

    })

}
