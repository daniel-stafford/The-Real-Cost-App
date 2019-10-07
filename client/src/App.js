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
  LOGIN,
  CREATE_USER
} from './graphQL/mutations'
import { Switch, Route, Link } from 'react-router-dom'

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

  const [createUser] = useMutation(CREATE_USER, {
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
        <Switch>
          <Route path='/login'>
            <LoginForm
              login={login}
              setToken={setToken}
              onError={handleError}
            />
          </Route>
          <Route path='/register'>
            <RegisterForm onError={handleError} createUser={createUser} />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    )
  }
  return (
    <div>
      <div>
        <div>
          <Link to='/expenses'>Expenses</Link>
          <Link to='/create_expense'>Create New</Link>
          <UserStatus handleCurrentUser={handleCurrentUser} />
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
      <Switch>
        <Route path='/expenses'>
          <ExpenseList
            expenses={expenses}
            addUse={addUse}
            deleteExpense={deleteExpense}
            onError={handleError}
          />
        </Route>
        <Route path='/create_expense'>
          <CreateForm addExpense={addExpense} onError={handleError} />
        </Route>
      </Switch>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default App
