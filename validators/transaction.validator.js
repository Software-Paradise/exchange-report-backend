const fetch = require("node-fetch")
const _ = require("lodash")


/**
 * Expresion regular para verificar/reemplazar caracteres
 * especiales para hash de transacciones/billeteras
 */
 const testRegexHash = /^[a-zA-Z0-9]+$/

 /**
  * Funcion que valida hash superficialmente de caracteres especiales
  */
 const isValidHash = (hash = '') => testRegexHash.test(hash)

/**
 * Retorna la respuesta en formato JSON apartir de una peticion `fetch`
 * -- --
 * @param {String} url 
 */
 const Petition = async (url = "") => {
  const response = await fetch(url)
      .then(response => response.json())
      .then(json => {
          return json
      })

  return response
}

const validateAmount = (outputs = [], amount = 0) => {

  /**
   * precision decimals
   */
  const precision = 8

  for (let index = 0; index < outputs.length; index++) {
      const element = outputs[index]

      // monto de blockchain
      const a = _.floor(element, precision)

      // console.log(a)

      // monto del usuario
      const b = _.floor(amount, precision)

      // validamos si los montos son correctos
      if (a === b) {
          return true
      }
  }

  return false
}

module.exports = {
  /**
     *
     * @param {Object} data | NewUser Object
     * @returns
     */
  createValidator: (data) => {
    if (data?.transaction && data?.info) {
      const { transaction, info } = data
      if (
        (transaction?.idcoin_from || transaction?.idcoin_from === 0) &&
            (transaction?.idcoin_to || transaction?.idcoin_to === 0) &&
            transaction?.amount_from &&
            transaction?.amount_to &&
            transaction?.city &&
            transaction?.agent_wallet &&
            transaction?.customer_wallet &&
            transaction?.idfee &&
            transaction?.idtype &&
            transaction?.idstatus &&
            transaction?.idcountry &&
          info?.transaction_amount_usd &&
            (info?.miner_fee_crypto || info?.miner_fee_crypto === 0.00) &&
            info?.cvc_from &&
            info?.cvc_to
      ) return true
    } else return false
  },

  transactionHASHValidator: async (hash, amount, address, symbol_from)=>{
    try {
      // verificamos si el hash tiene un formato valido
      if (!isValidHash(hash)) {
          throw String(ERRORS.FORMAT)
      }

      /*URI QUE SE CONSTRUYE APARTIR DEL SIMBOLO DE LA MONEDA Y EL HASH DE LA TRANSACCION*/
      const uri = `https://api.blockcypher.com/v1/${symbol_from}/main/txs/${hash}?limit=1000`

      const Response = await Petition(uri)
      const outputs = []

      // verificamo si hay un error en la peticion
      // Este error de peticion la retorna el servidor blockchain cuando no existe esta transaccion
      if (Response.error) {
          throw String(ERRORS.HASH)
      }

      /**verificamos el tipo de wallets desde la que se realiza la transaccion */
      if(symbol_from ==='eth'){

          // verificamos que el hash sea igual al de blockchain
          if (Response.hash !== hash.substr(2).toLowerCase()) throw String(ERRORS.HASH)

          // Guardamos la direccion de la compania, quitandole el prefijo `0X` de ethereum
          const AddressCompany = address.substr(2).toLowerCase()

          // mapeamos los valores comision y el valor de la transferncia
          Response.outputs.forEach(output => outputs.push((parseFloat(output.value) * 0.000000000000000001)).toFixed(8))

          // verificamos si la transaccion se deposito a la wallet de la empresa
          if (!Response.addresses.includes(AddressCompany)) {
              throw String(ERRORS.NOTFOUND)
          }
      }
      else {

          // verificamos que el hash sea igual al de blockchain
          if (Response.hash !== hash) throw String(ERRORS.HASH)

          // mapeamos los valores comision y el valor de la transferncia
          Response.outputs.forEach(output => outputs.push(parseFloat(output.value) * 0.00000001))

          // verificamos si la transaccion se deposito a la wallet de la empresa
          if (!Response.addresses.includes(address)) {
              throw String(ERRORS.NOTFOUND)
          }
      }
      
      // Validamos si la cantidad esta entre los fee y la cantidad exacta que retorna blockchain
      if (!validateAmount(outputs, amount)) {
          throw String(ERRORS.AMOUNT)
      }

      // validamos si la transaccion tiene al menos 3 confirmacion
      if (Response.confirmations < 3) {
          throw String(ERRORS.CONFIRMATION)
      }

      // retornamos un success (TODO ESTA CORRECTO)
      return {success: true}
    } catch (error) {
        return badException(error)
    }
  }
}
