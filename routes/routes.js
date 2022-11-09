const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', (req, res) => res.send("Working"))

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await Card.find({})
    return res.status(200).json(cards)
  } catch (err) {
    next(err)
  }
})

router.post('/cards', async (req, res, next) => {
  console.log(req.body)
  const {content, category} = req.body
  if (!content || !category) {
    res.status(401)
    return next(new Error("Bad request body"))
  }
  try {
    const card = await Card.create(req.body)
    res.json(card)
  } catch(err) {
    return next(err)
  }
})

router.put('/cards/:id', async (req, res) => {
  // Code here
})

module.exports = router