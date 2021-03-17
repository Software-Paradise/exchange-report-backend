const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const userModel = db.users;

const userController = {
    listUsers: async (req, res)=>{
        const users = await userModel.findAll({})
        if(users){
            res.status(200).json({success: true, users})
        }else{
            res.status(400).json({success: false, error: `Error en la consulta`})
        }
    },
    
    registerTest: async (req, res)=>{
        let newUser = {
            username: req.body.username,
            location: req.body.location,
            email: req.body.email,
            number_phone: req.body.phone,
            password: req.body.password
        }

        console.log(newUser)

        let hash = bcrypt.hashSync(newUser.password, 10)

        if(hash){
            newUser.password = hash;
            let user = userModel.create(newUser)

            if(user){
                res.status(200).json({success: true, user})
            }else{
                res.status(400).json({success: false, error: `something wrong`})
            }

        }else{
            res.status(400).json({sucess: false, error: `An error has ocurred to try hash password`})
        }
    },

    login: async (req, res)=>{
        
        let data={
            email: req.body.email,
            password: req.body.password,
        }

        let user = await userModel.findAll({where:{email: data.email}})

        if(user[0]){
           if(bcrypt.compareSync(data.password, user[0].password)){
                let token = jwt.sign({username: `${user[0].USERNAME}`},process.env.JWT_SECRET_KEY, {expiresIn: '8h'});
                res.status(200).json({success: true, user: user[0], token, message: `ok`})
           }else{
               res.json({success: false, message: `Your password is incorrect`})
           }
        }else{
            res.json({success: false, message: `this email account: ${data.email} is not registered. Please Sign Up`})
        }

    },
}

module.exports = userController;