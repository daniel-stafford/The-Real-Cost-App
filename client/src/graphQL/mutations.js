import { gql } from 'apollo-boost'

export const ADD_EXPENSE = gql`
  mutation addExpense(
    $title: String!
    # $purchaseDate: String
    $price: Int!
    $notes: String
  ) {
    addExpense(
      title: $title
      # purchaseDate: $purchaseDate
      price: $price
      notes: $notes
    ) {
      title
      # purchaseDate
      price
      uses
    }
  }
`
export const ADD_USE = gql`
  mutation addUse($id: ID!) {
    addUse(id: $id) {
      title
      # purchaseDate
      price
      uses
      notes
    }
  }
`

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      title
      # purchaseDate
      price
      uses
      notes
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
