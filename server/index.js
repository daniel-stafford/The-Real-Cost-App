require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const Expense = require('./models/expense')

const url = process.env.MONGODB_URI

mongoose
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Expense {
    title: String!
    price: Int!
    purchaseDate: String
    uses: Int!
    notes: String
    id: ID!
  }

  type Query {
    expenses: [Expense]
  }
  type Mutation {
    addExpense(
      title: String!
      price: Int!
      purchaseDate: String
      notes: String
    ): Expense!
    addUse(id: ID!): Expense!
    deleteExpense(id: ID!): Expense!
  }
`

const resolvers = {
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
        console.log('something went wrong with saving the expense', error)
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
        console.log('something went wrong with delete', e)
      }
      await Expense.findByIdAndDelete(id)
      return expenseToDelete
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  // console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
