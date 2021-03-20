const router = require('express').Router();
const {walletController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index')

module.exports = (app)=>{
    app.use('/wallets', router);

    router.get('/list', authentication, async (_, res)=>{
        const {success, message, wallets} = await walletController.listWallets()

        if(success){
            res.json({success, message, wallets}).status(200)
        }else{
            res.json({success, message}).status(400)
        }
    })
    
    router.post('/create', authentication, async (req, res)=>{
        let newCoin={
            id_wallet: req.body.id_wallet,
            id_user: req.body.id_user, 
            id_coin: req.body.id_coin
        }
        const {success, message, newWallet} = await walletController.create(newCoin);

        if(success){
            res.json({success, message, newWallet}).status(200)
        }else{
            res.json({success, message}).status(400)
        }

    })

}