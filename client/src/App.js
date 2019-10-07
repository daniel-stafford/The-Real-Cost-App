import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'
import LoginForm from './components/LoginForm'
import UserStatus from './components/UserStatus'
import { ALL_EXPENSES } from './graphQL/queries'
import {
  ADD_EXPENSE,
  ADD_USE,
  DELETE_EXPENSE,
  LOGIN
} from './graphQL/mutations'

const App = () => {
  const client = useApolloClient()

  const [errorMessage, setErrorMessage] = useState(null)
  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>
  const handleError = error => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

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

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [loggedInUser, setLoggedInUser] = useState(null)
  console.log('loggedInUser app leel', loggedInUser)

  const handleCurrentUser = user => {
    console.log('handling current user', user)
    setLoggedInUser(user)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {errorNotification()}
      <LoginForm login={login} setToken={setToken} />
      <button onClick={() => logout()}>Logout</button>
      {token && <UserStatus handleCurrentUser={handleCurrentUser} />}
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
