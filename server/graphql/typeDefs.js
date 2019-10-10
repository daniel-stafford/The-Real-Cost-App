const { gql } = require('apollo-server')

module.exports = gql`
  scalar Date
  type Expense {
    title: String!
    price: Int!
    uses: Int!
    notes: String
    id: ID!
    creator: User!
    createdAt: Date!
    updatedAt: Date!
  }
  type User {
    username: String!
    id: ID!
    createdExpenses: [Expense!]
  }
  type Token {
    value: String!
  }

  type Query {
    expenses: [Expense]
    expenseById(id: ID!): Expense!
    users: [User]
    me: User
  }

  type Mutation {
    addExpense(
      title: String!
      price: Int!
      # purchaseDate: String
      notes: String
    ): Expense!
    addUse(id: ID!): Expense!
    deleteExpense(id: ID!): Expense!
    createUser(username: String!, password: String!): User!
    login(username: String!, password: String!): Token
  }
`
