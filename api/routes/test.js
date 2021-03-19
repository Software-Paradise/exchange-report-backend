const router = require('express').Router();
const {htmlConfig} = require('../../config/index')

module.exports = (app) => {
  
  app.use('/test', router)
  
  router.get('/index', async (_, res)=>{
      const {success, message, html} = await htmlConfig.generate('test.html');
      if(success){
        res.send(html)
      }else{
        res.json({success, message}).status(400)
      }
  });

};