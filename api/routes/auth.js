const {usersController} = require('../../controllers/index')
const router = require('express').Router();

/**
 * 
 * @param {*} app - Instancia del Framework de Express
 * @property
 */
module.exports = (app) => {
   
    app.use('/auth', router)

    /** 
     * User Login Route
     * @route {POST} /auth/login
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     * 
    */
    router.post('/login', async (req, res)=>{
        let credential={
            email: req.body.email,
            password: req.body.password
        }
        
        const {success, message, user, token} = await usersController.login(credential)
        
        if(success){
            return res.status(201).json({success, message, user, token})
        }else{
            return res.status(400).json({message, success})
        }
    })

    /** 
     * User Register Route
     * @route {POST} /auth/register
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     * 
    */
    router.post('/register', async (req, res)=>{
        let user={
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    
        const {success, message} = await usersController.register(user)
    
        if(success){
            res.status(200).json({message, success})
        }else{
            res.status(400).json({message, success})
        }
    
    })

};