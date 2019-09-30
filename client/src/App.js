import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'

const ALL_EXPENSES = gql`
  {
    expenses {
      title
      price
      uses
      purchaseDate
      notes
      id
    }
  }
`
const ADD_EXPENSE = gql`
  mutation addExpense(
    $title: String!
    $purchaseDate: String
    $price: Int!
    $notes: String
  ) {
    addExpense(
      title: $title
      purchaseDate: $purchaseDate
      price: $price
      notes: $notes
    ) {
      title
      purchaseDate
      price
      uses
    }
  }
`
const ADD_USE = gql`
  mutation addUse($id: ID!) {
    addUse(id: $id) {
      title
      purchaseDate
      price
      uses
      notes
    }
  }
`

const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      title
      purchaseDate
      price
      uses
      notes
    }
  }
`

const App = () => {
  const expenses = useQuery(ALL_EXPENSES)
  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [addUse] = useMutation(ADD_USE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  console.log('expenses', expenses)
  return (
    <div>
      <CreateForm addExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        addUse={addUse}
        deleteExpense={deleteExpense}
      />
    </div>
  )
}

export default App
