const router = require('express').Router();
const {coinsController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index');

module.exports = (app)=>{
    app.use('/coins', router);

    router.get('/list/', authentication, async (_, res)=>{
        const {success, message, typeCoin} = await coinsController.listCoin()
        if(success){
            res.json({typeCoin, success}).status(200)
        }else{
            res.json({message, success}).status(400)
        }
    })
    
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
