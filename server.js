const mongoose = require('mongoose')
require('dotenv').config()

function bootServer() {
  const express = require('express')
  const path = require('path')
  const app = express()
  
  app.use((req, res, next) => {
    const getTimeStamp = () => new Date().toISOString()

    res.on('finish', () => {
      console.info(`[${getTimeStamp()}] [INFO] [Server] ${req.method} ${req.url}`, res.statusCode)
    })
    next()
  })

  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.urlencoded({ extended: false }))

  app.get('/', (req, res) => res.sendFile('index.html'))
  
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started! Now listening on http://localhost:${process.env.PORT || 3000}`)
  })
}

mongoose
  .connect(process.env.MONGO_URI)
  .catch(err => console.error(err))
  .then(() => console.log("Connected to mongoose server"))
  .then(bootServer)
mongoose.Promise = global.Promise