require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const Expense = require('./models/expense')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Expense {
    title: String!
    cost: Int!
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
      cost: Int!
      purchaseDate: String
      notes: String
    ): Expense!
    addUse(id: ID!): Expense!
  }
`

const resolvers = {
  Query: {
    expenses: () => Expense.find({})
  },
  Mutation: {
    addExpense: async (root, args) => {
      const { title, cost, purchaseDate, notes } = args
      let expense = new Expense({
        title,
        cost,
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
      console.log('adduse id', id)
      await Expense.findByIdAndUpdate(...uses, { uses: uses + 1 })
      console.log('addUse expense', Expense.findById(id))
      return Expense.findById(id)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  // console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
