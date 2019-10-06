const bcrypt = require('bcryptjs')
const Expense = require('../models/expense')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  Query: {
    expenses: () => Expense.find({}),
    users: () => User.find({}),
    me: (root, args, { currentUser }) => currentUser
  },
  Mutation: {
    addExpense: async (root, args, { currentUser }) => {
      const { title, price, notes } = args
      console.log('context currentUser', currentUser)
      if (!currentUser) return console.log("sorry, you're not logged in")

      let expense = new Expense({
        title,
        price,
        // purchaseDate,
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

    addUse: async (root, { id }) => {
      const incremented = await Expense.findByIdAndUpdate(
        { _id: id },
        { $inc: { uses: 1 } },
        { new: true }
      )
      return incremented
    },

    deleteExpense: async (root, { id }) => {
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

    createUser: async (root, { username, password }) => {
      try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
          username,
          password: passwordHash
        })
        await user.save()
        const savedUser = User.findById(user.id)
        return savedUser
      } catch (error) {
        console.log('error with creating user', error.message)
      }
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user) return console.log('sorry, user not found')

      const matchPasswords = bcrypt.compareSync(password, user.password)
      if (!matchPasswords) return console.log('sorry, password is incorrect')

      return { value: jwt.sign(user.id, process.env.JWT_SECRET) }
    }
  }
}
