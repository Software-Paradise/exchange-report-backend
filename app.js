const express = require('express')
const loaders = require('./loaders')
const { vars, db } = require('./config/index')

async function startServer() {
    const app = express()

    await loaders.init( app )

    app.listen(vars.PORT, err => {
        if (err) {
            console.log(err)
            return
        }

        console.log(`Server running at port: ${vars.PORT}`)
    })
}

startServer()
