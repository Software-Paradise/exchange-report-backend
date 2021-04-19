module.exports = {
  creteCoin: () => {
    return 'INSERT INTO coin (`IDCOIN`, `NAME`, `SYMBOL`, `PRICE`) VALUES (:idcoin, :name, :symbol, :price)'
  }
}
