const { Schema, model } = require('mongoose') 

const cardSchema = new Schema({
  content: String,
  category: String
})

module.exports = model('Card', cardSchema)