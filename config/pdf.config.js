/**
 * Configuraciones para el controlador pdf
 */
const pdfConfig = {
  /**
     *
     * @returns Objeto con la configuracion estandar para generar un pdf tamaño carta
     */
  letter: () => ({ path: `RP${new Date().getTime()}.pdf`, format: 'letter', printBackground: true }),
  invitation: () => ({ path: `IN${new Date().getTime()}.pdf`, width: '499px', height: '547px', printBackground: true }),
  /**
     *
     * @returns Objeto para el marco y resolucion del generador
     */
  viewPort: () => ({ width: 1440, height: 900, deviceScaleFactor: 1 }),
  viewPort2: () => ({ width: 500, height: 550, deviceScaleFactor: 1 })

}

module.exports = pdfConfig
