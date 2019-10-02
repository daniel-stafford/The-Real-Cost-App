require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')

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

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  // console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
