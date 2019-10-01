const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdExpenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense'
    }
  ]
})

schema.plugin(uniqueValidator)
schema.set('timestamps', true)

module.exports = mongoose.model('User', schema)
