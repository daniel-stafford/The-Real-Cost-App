import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'
import { ALL_EXPENSES } from './graphQL/queries'
import { ADD_EXPENSE, ADD_USE, DELETE_EXPENSE } from './graphQL/mutations'

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
  console.table('expenses', expenses)
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
