/**
 * Configuraciones para el controlador pdf
 */
const pdfConfig = {
  /**
     *
     * @returns Distintas configuraciones para generar pdf con puppetter
     */
  letter: () => ({ path: `RP${new Date().getTime()}.pdf`, format: 'letter', printBackground: true }),
  invitation: () => ({ path: `IN${new Date().getTime()}.pdf`, width: '499px', height: '547px', printBackground: true }),
  comprobante: () => ({ path: `IN${new Date().getTime()}.pdf`, width: '692px', height: '779px', printBackground: true }),
  /**
     *
     * @returns Objeto para el marco y resolucion del generador
     */
  viewPort: () => ({ width: 1440, height: 900, deviceScaleFactor: 1 }),
  viewPort2: () => ({ width: 500, height: 550, deviceScaleFactor: 1 }),
  viewPort3: () => ({ width: 694, height: 779, deviceScaleFactor: 1 })

}

module.exports = pdfConfig
