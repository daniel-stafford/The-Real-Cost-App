import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'

const ALL_EXPENSES = gql`
  {
    expenses {
      title
      cost
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
    $cost: Int!
    $notes: String
  ) {
    addExpense(
      title: $title
      purchaseDate: $purchaseDate
      cost: $cost
      notes: $notes
    ) {
      title
      purchaseDate
      cost
      uses
    }
  }
`
const ADD_USE = gql`
  mutation addUse($id: ID!) {
    addUse(id: $id) {
      title
      purchaseDate
      cost
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
  console.log('expenses', expenses)
  return (
    <div>
      <CreateForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} addUse={addUse} />
    </div>
  )
}

export default App
