const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    createdExpenses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Expense'
      }
    ]
  },
  { timestamps: true }
)

schema.plugin(uniqueValidator)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', schema)
