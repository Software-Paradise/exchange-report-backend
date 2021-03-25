const {usersController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index');
const router = require('express').Router();

/**
 * 
 * @param {*} app Instancia del Framework Express
 */
module.exports = (app)=>{

    app.use('/users', router);

    /** 
     * Wallet list Route
     * @route {GET} /users/list
     * @authentication Esta requiere autenticacion de token 
     * 
    */
    router.get('/list', authentication ,async (_, res)=>{
        const {users} = await usersController.listUsers()
        if(users){
            res.status(200).json({success: true, users})
        }else{
            res.status(400).json({success: false, message: 'Something wrong'})
        }
    })

}