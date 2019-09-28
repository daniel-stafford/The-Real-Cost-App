const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  cost: {
    type: Number,
    required: true
  },
  uses: {
    type: [Date]
  },
  notes: {
    type: String
  }
})

module.exports = mongoose.model('Expense', schema)
