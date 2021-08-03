const { sequelizeConfig } = require('../../config/index')
const { initDataBase } = require('../../alypay_models')

const conn = async () => {
    return await initDataBase(sequelizeConfig[1])
}

const list = async (_, res) => {
    
    try {
        const db = await conn()
        console.time('filterquery')
        const users = await db.users.findAll({})
        console.timeEnd()
        return res.json({ users, error: false, message: 'is ok' }).status(200)
    } catch (error) {
        return res.json({ error: true, message: error }).status(404)
    }
}

module.exports = {
    list
}