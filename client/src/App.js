import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'
import { ALL_EXPENSES } from './graphQL/queries'
import {
  ADD_EXPENSE,
  ADD_USE,
  DELETE_EXPENSE,
  LOGIN
} from './graphQL/mutations'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>
  const expenses = useQuery(ALL_EXPENSES)
  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [addUse] = useMutation(ADD_USE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })
  console.table('expenses', expenses)
  return (
    <div>
      {errorNotification()}
      <CreateForm addExpense={addExpense} onError={handleError} />
      <ExpenseList
        expenses={expenses}
        addUse={addUse}
        deleteExpense={deleteExpense}
        onError={handleError}
      />
    </div>
  )
}

export default App
