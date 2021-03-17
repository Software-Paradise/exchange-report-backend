const db = require("../models");
const typeCoinModel = db.type_coin;

const typeCoinController = {
    listCoin: async (req, res)=>{
        const typeCoin = await typeCoinModel.findAll({})
        if(typeCoin){
            res.status(200).json({success: true, typeCoin})
        }else{
            res.status(400).json({success: false, error: `Error en la consulta`})
        }
    },

    create: (req, res) =>{
        let newCoin={
            description: req.body.description,
            symbol: req.body.symbol
        }
        
        typeCoinModel.create(newCoin).then(coin=>{
            if(coin){
                res.status(201).json({success: true, message: 'has been created succesfully'})
            }else{
                res.status(400).json({message:'An error has ocurred', success: false})
            }
        }).catch(err=>{
            res.status(400).json({error: err, success: false})
        })

        
    }
}

module.exports = typeCoinController;