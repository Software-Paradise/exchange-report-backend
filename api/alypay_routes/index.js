const test = require('./test')
const auth = require('./auth')


const routes = () => {
    const app = require('express')()
    test('/test', app)
    auth('/auth', app)
    return app
}

module.exports = routes