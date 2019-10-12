require('dotenv').config()

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose')
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

if (process.env.NODE_ENV === 'production') {
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedId = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedId).populate(
        'createdExpenses'
      )
      return { currentUser }
    }
  }
})

const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server ready at port ${process.env.PORT}`)
})

