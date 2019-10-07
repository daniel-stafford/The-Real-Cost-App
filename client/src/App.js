import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import CreateForm from './components/CreateForm'
import ExpenseList from './components/ExpenseList'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import UserStatus from './components/UserStatus'
import { ALL_EXPENSES } from './graphQL/queries'
import {
  ADD_EXPENSE,
  ADD_USE,
  DELETE_EXPENSE,
  LOGIN
} from './graphQL/mutations'
import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('')

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
  if (!token) {
    return (
      <div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Sign Up</Link>
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Switch>
          <Route path='/login'>
            <LoginForm
              login={login}
              show={page === 'signin'}
              setToken={setToken}
              onError={handleError}
            />
          </Route>
          <Route path='/register'>
            <RegisterForm
              login={login}
              show={page === 'signup'}
              setToken={setToken}
              onError={handleError}
            />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    )
  }
  return (
    <div>
      <UserStatus handleCurrentUser={handleCurrentUser} />
      <button onClick={() => logout()}>Logout</button>

      <CreateForm addExpense={addExpense} onError={handleError} />
      <ExpenseList
        expenses={expenses}
        addUse={addUse}
        deleteExpense={deleteExpense}
        onError={handleError}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default App
