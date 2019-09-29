import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'

const ALL_EXPENSES = gql`
  {
    expenses {
      title
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

const App = () => {
  const expenses = useQuery(ALL_EXPENSES)
  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  console.log('expenses', expenses)
  return (
    <div>
      {!expenses.loading &&
        expenses.data.expenses.map(e => {
          return <li key={e.title}>{e.title}</li>
        })}
      <CreateForm addExpense={addExpense} />
    </div>
  )
}

export default App
