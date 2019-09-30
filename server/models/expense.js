const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  price: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: String
  },
  uses: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
})

schema.set('timestamps', true)

module.exports = mongoose.model('Expense', schema)
