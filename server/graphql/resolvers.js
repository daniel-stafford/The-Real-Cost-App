const bcrypt = require('bcryptjs')
const Expense = require('../models/expense')
const User = require('../models/user')

module.exports = {
  Query: {
    expenses: () => Expense.find({})
  },
  Mutation: {
    addExpense: async (root, args) => {
      const { title, price, purchaseDate, notes } = args
      let expense = new Expense({
        title,
        price,
        purchaseDate,
        notes
      })
      try {
        await expense.save()
      } catch (error) {
        console.log(
          'something went wrong with saving the expense',
          error.message
        )
      }
      return expense
    },
    addUse: async (root, args) => {
      const { id } = args
      const incremented = await Expense.findByIdAndUpdate(
        { _id: id },
        { $inc: { uses: 1 } },
        { new: true }
      )
      return incremented
    },
    deleteExpense: async (root, args) => {
      const { id } = args
      const expenseToDelete = await Expense.findById(id)
      console.log('expensetodelete', expenseToDelete)
      try {
        await Expense.findByIdAndDelete(id)
      } catch (e) {
        console.log('something went wrong with delete', e.message)
      }
      await Expense.findByIdAndDelete(id)
      return expenseToDelete
    },
    createUser: async (root, args) => {
      const { username, password } = args
      try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
          username,
          password: passwordHash
        })
        await user.save()
        const savedUser = User.findById(user.id)
        //todo: figure out how to not return the password {...savedUser, password: null} doesn't work.  Also tried {...savedUser._doc, password: null}
        return savedUser
      } catch (error) {
        console.log('error with creating user', error.message)
      }
    }
  }
}
