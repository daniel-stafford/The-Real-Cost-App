const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  cost: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date
  },
  uses: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
})

module.exports = mongoose.model('Expense', schema)
