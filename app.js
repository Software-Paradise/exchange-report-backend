const express = require('express')
const loaders = require('./loaders/index')
const { vars, sequelizeConfig } = require('./config/index')
//const ngrok = require('ngrok')

async function startServer() {
  const app = express()

  await loaders.init({ expressApp: app, sequelizeConfig })

  app.listen(vars.PORT, err => {
    if (err) {
      console.log(err)
      return
    }

    console.log(`Server running at port: ${vars.PORT}`)

    // if (ngrok) { // open a tunnel
    //   ngrok.connect(vars.PORT, (err, url) => {
    //     if (err) {
    //       return console.log(err)
    //     }
    //     console.log(`Server started. Tunnel running at url ${url}`)
    //   })
    // } else { // start normally
    //   console.log(`Server running at port: ${vars.PORT}`)
    // }
  })
}

startServer()
