const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const schema = new Schema({
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
  // purchaseDate: {
  //   type: String
  // },
  uses: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
schema.plugin(uniqueValidator)
schema.set('timestamps', true)

module.exports = mongoose.model('Expense', schema)
