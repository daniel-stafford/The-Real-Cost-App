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
  const handleError = error => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
  console.log('loggedinuser', loggedInUser)
  const handleCurrentUser = user => {
    setLoggedInUser(user)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <LoginForm login={login} setToken={setToken} onError={handleError} />
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
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default App
