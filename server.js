/* DO NOT TAMPER WITH THIS FILE !!*/
const mongoose = require('mongoose')
require('dotenv').config()

/**
 * This function creates the HTTP Server and connects your server to the local running MongoDB
 */
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

  app.use(express.json())
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.urlencoded({ extended: false }))

  app.use('/api', require('./routes/routes'))

  app.get('/', (req, res) => res.sendFile('index.html'))

  app.use((err, req, res, next) => {
    res.json({ error: err.message })
  })
  
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has started! Now listening on http://localhost:${process.env.PORT || 3000}`)
  })
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => console.error(err))
  .then(() => console.log("Connected to mongoose server"))
  .then(bootServer)
mongoose.Promise = global.Promise