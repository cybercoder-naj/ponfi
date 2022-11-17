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
  const {content, category} = req.body
  if (!content || !category) {
    console.log(req.body)
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

router.put('/cards/:id', async (req, res, next) => {
  const {content, category} = req.body
  const {id} = req.params
  if (!(id && content && category)) {
    res.status(401)
    return next(new Error("Bad request body"))
  }
  try {
    await Card.findByIdAndUpdate({_id: id}, {content, category})
    const newCard = await Card.findOne({_id: id})

    return res.json(newCard)
  } catch (err) {
    return next(err)
  }
})

module.exports = router