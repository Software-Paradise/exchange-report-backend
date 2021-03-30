const express = require('express')
const loaders = require('./loaders/index')
const { vars } = require('./config/index')

async function startServer () {
  const app = express()

  await loaders.init({ expressApp: app })

  app.listen(vars.PORT, err => {
    if (err) {
      console.log(err)
      return
    }

    console.log(`Server running at port: ${vars.PORT}`)
  })
}

startServer()
