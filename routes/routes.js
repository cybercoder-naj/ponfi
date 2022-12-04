const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', (req, res) => res.send("Working"))

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await Card.find({})
    return res.status(200).json(cards)
  }

  catch (err) {
    next(err)
  }
  
})

router.post('/cards', async (req, res, next) => {
  const {content,category} = req.body
  if (!content || !category) {
    return next(new Error("Bad request body"))
  }

  try {
    const card = await Card.create({ content, category })
    return res.status(200).json(card)
  }
  catch (err) {
    next(err)
  }
    
})

router.put('/cards/:id', async (req, res, next) => {
  // Code here
  const { content, category } = req.body
  const { id } = req.params

  if (!id || !content || !category) {
    return next(new Error("Bad request body"))
  }

  try {
    Card.findByIdAndUpdate({_id: id }, { content, category })
    const card = await Card.findOne({ _id: id })
    return res.status(200).json(card)
  }

  catch(err) {
    next(err)
  }

})

module.exports = router