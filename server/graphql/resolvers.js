const bcrypt = require('bcryptjs')
const Expense = require('../models/expense')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const moment = require('moment')
const { AuthenticationError } = require('apollo-server')

module.exports = {
  Query: {
    expenses: () => Expense.find({}).populate('creator'),
    users: () => User.find({}).populate('createdExpenses'),
    me: (root, args, { currentUser }) => currentUser,
    expenseById: (root, { id }) => Expense.findById(id)
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    }
  }),
  Mutation: {
    addExpense: async (root, args, { currentUser }) => {
      const { title, price, notes } = args
      if (!currentUser) throw new AuthenticationError('You must be logged in')

      let expense = new Expense({
        title,
        price,
        // purchaseDate,
        notes,
        creator: currentUser.id
      })
      try {
        await expense.save()
        const savedExpense = await Expense.findOne({ title })
        const user = await User.findById(savedExpense.creator)
        user.createdExpenses = user.createdExpenses.concat(savedExpense.id)
        await user.save()
        return savedExpense.populate('user')
      } catch (error) {
        console.log(
          'something went wrong with saving the expense',
          error.message
        )
      }
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
