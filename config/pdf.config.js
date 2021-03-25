/**
 * Configuraciones para el controlador pdf
 */
const pdfConfig = {
    /**
     * 
     * @returns Objeto con la configuracion estandar para generar un pdf tamaño carta
     */
    letter: ()=>({path: `RP${new Date().getTime()}.pdf`, format: 'letter', printBackground: true}),
    /**
     * 
     * @returns Objeto para el marco y resolucion del generador
     */
    viewPort: ()=>({width: 1440, height: 900, deviceScaleFactor: 1 })
}

module.exports = pdfConfig;