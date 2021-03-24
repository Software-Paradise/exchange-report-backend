const router = require('express').Router();
const {sendMailController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index')

module.exports = (app) => {
  
  app.use('/test', router)
  
  router.get('/index', authentication,  async (_, res)=>{
      res.json({success: true})
  });

  router.get('/sendmail', authentication, async(_, res)=>{
      const {success, message, info} = await sendMailController.sendMailTest()
      if(success){
        res.json({message, info}).status(200);
      }else{
        res.json({message}).status(400);
      }
  })

  router.get('/saludar', (_, res)=>{
    res.json({message: `todo esta correcto`})
  })

};