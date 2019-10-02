const { gql } = require('apollo-server')

module.exports = gql`
  type Expense {
    title: String!
    price: Int!
    purchaseDate: String
    uses: Int!
    notes: String
    id: ID!
    creator: User!
  }
  type User {
    username: String!
    password: String
    id: ID!
    createdExpenses: [Expense!]
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
    createUser(username: String!, password: String!): User!
  }
`
