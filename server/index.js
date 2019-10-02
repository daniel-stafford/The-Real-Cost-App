require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      console.log('decodedToken', decodedToken)
      const currentUser = await User.findById(decodedToken).populate(
        'createdExpenses'
      )
      console.log('currentUser', { currentUser })
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  // console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
