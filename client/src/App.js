import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  CreateForm,
  ExpenseList,
  LoginForm,
  RegisterForm,
  Home,
  UserStatus
} from './components/index'
import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const client = useApolloClient()

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

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

  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = error => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
            <LoginForm setToken={setToken} onError={handleError} />
          </Route>
          <Route path='/register'>
            <RegisterForm onError={handleError} />
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
          <ExpenseList onError={handleError} />
        </Route>
        <Route path='/create_expense'>
          <CreateForm onError={handleError} />
        </Route>
      </Switch>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default App
