/* eslint-disable camelcase */
module.exports = {
  calprofit: (data) => {
    const {
      idtype, transaction_amount_usd,
      bns_fee, miner_fee_crypto, amount_to,
      cvc_to, agent_fee
    } = data
    let bns_commission_usd = 0.00
    let exe_usd = 0.00
    let miner_fee_percentage = 0.00
    let miner_fee_usd = 0.00
    let agent_profit_usd = 0.00
    let business_profit_usd = 0.00

    /** calculate profit from a currency purchase */
    switch (idtype) {
      case 1:
        bns_commission_usd = transaction_amount_usd * bns_fee
        exe_usd = transaction_amount_usd - bns_commission_usd
        miner_fee_percentage = miner_fee_crypto / amount_to
        miner_fee_usd = miner_fee_crypto * cvc_to
        agent_profit_usd = (bns_commission_usd - miner_fee_usd) * agent_fee
        business_profit_usd = (agent_profit_usd / agent_fee) - agent_profit_usd
        break
    }

    return ({
      bns_commission_usd,
      exe_usd,
      miner_fee_percentage,
      miner_fee_usd,
      agent_profit_usd,
      business_profit_usd
    })
  }
}
