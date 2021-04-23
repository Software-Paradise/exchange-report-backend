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
  }
}
