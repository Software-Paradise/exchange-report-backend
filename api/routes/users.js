const {usersController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index');
const router = require('express').Router();

module.exports = (app)=>{

    app.use('/users', router);

    router.get('/list', authentication ,async (_, res)=>{
        const {users} = await usersController.listUsers()
        if(users){
            res.status(200).json({success: true, users})
        }else{
            res.status(400).json({success: false, message: 'Something wrong'})
        }
    })

}