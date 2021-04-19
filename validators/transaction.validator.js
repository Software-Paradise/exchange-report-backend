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

  /**
     *
     * @param {*} data | Params
     * @returns {Boolean} Params is correct ?
     */
  findOneValidator: (data) => {
    const onlyNumber = /^[0-9]{1,}$/
    if (data?.id && onlyNumber.test(data?.id) && data?.id > 0) return true
    else return false
  }

}
