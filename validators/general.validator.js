module.exports = {
  paramsValidator: (data) => {
    const onlyNumber = /^[0-9]{1,}$/
    if (data?.id && onlyNumber.test(data?.id) && data?.id > 0) return true
    else return false
  }
}
