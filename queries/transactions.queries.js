module.exports = {
  storageProcess: {
    calculateProfit: () => {
      return `CALL REGISTER_TRANSACTION_INFO(
        :idtransaction,
        :idtype,
        :bns_commission_usd,
        :miner_fee_cripto,
        :miner_fee_pct,
        :amount_to,
        :amount_from,
        :cvc_to,
        :cvc_from,
      )`
    }
  }
}
