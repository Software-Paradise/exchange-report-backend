const router = require('express').Router();
const {sendMailController} = require('../../controllers/index')
const {authentication} = require('../middlewares/index')
const {pdfController} = require('../../controllers/index')
const path = require('path');

/**
 * @module testRoutes test Router
 * @param {*} app - Instancia del Framework de Express
 */
module.exports = (app) => {
  
  app.use('/test', router)
  
  /** 
     * Ruta de prueba de autenticacion de token de usaurio
     * @route {GET} /test/index
     * @authentication Requiere Middleware de autenticacion
     * 
    */
  router.get('/index', authentication,  async (_, res)=>{
      res.json({success: true})
  });


  /** 
     * Ruta de prueba de envio de correos a la cuenta de un usuario
     * @route {GET} /test/index
     * @authentication Requiere Middleware de autenticacion
     * 
    */
  router.get('/sendmail', authentication, async(_, res)=>{
      const pathTemplate = path.resolve('./templates', 'emailTemplate.hbs');
      const {success, message, info} = await sendMailController.generateEmail(pathTemplate)
      if(success){
        res.json({message, info}).status(200);
      }else{
        res.json({message}).status(400);
      }
  })
  
  /** 
     * Ruta de prueba del enlace que se envio al correo del usuario
     * @route {GET} /test/index
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     * 
    */
  router.get('/saludar', (_, res)=>{
    res.json({message: `todo esta correcto`})
  })


  /** 
     * Ruta de prueba para generacion de archivos pdf
     * @route {GET} /test/index
     * @authentication Esta ruta no requiere authenticacion basica HTTP
     * 
    */
  router.get('/generate/pdf', async (_,res)=>{

    const pathTemplate = path.resolve('./templates', 'testTemplate.hbs');
    const {success, message, name} = await  pdfController.generatePDF(pathTemplate,{});
    if(success){
      res.json({message}).status(200)
    }else res.json({message}).status(400)

  })

};