import { gql } from 'apollo-boost'

export const ALL_EXPENSES = gql`
  {
    expenses {
      title
      price
      uses
      # purchaseDate
      notes
      id
      createdAt
      updatedAt
    }
  }
`
export const CURRENT_USER = gql`
  {
    me {
      username
      id
      createdExpenses {
        title
      }
    }
  }
`
export const EXPENSE_BY_ID = gql`
  query expenseById($id: ID!) {
    expenseById(id: $id) {
      title
      price
      uses
      notes
      id
    }
  }
`
