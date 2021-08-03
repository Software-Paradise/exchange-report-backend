const userLogin = () => {
    return `CALL login(
    :email,
    :passwordEncrypt,
    :public_ip,
    :device,
    :mac_address,
    :system_name
    )`
}
    
module.exports = {
    userLogin,
}
