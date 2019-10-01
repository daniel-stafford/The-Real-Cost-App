const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: Number,
    required: true
  },
  createdExpenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ]
})

schema.set('timestamps', true)

module.exports = mongoose.model('Expense', schema)
