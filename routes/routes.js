const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', (req, res) => res.send("Working"))

router.get('/cards', async (req, res, next) => {
  // Code here
})

router.post('/cards', async (req, res, next) => {
  // Code here
})

router.put('/cards/:id', async (req, res, next) => {
  // Code here
})

module.exports = router