module.exports = {
  storageProcess: {
    calculateProfit: () => {
      return `CALL CALCULATE_PROFIT(
        :idtransaction,
        :idtype,
        :transaction_amount_usd,
        :miner_fee_crypto,
        :amount_to,
        :amount_from,
        :cvc_to,
        :cvc_from,
        :agent_wallet
      )`
    }
  }
}
