import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  CreateForm,
  ExpenseList,
  LoginForm,
  RegisterForm,
  Home,
  UserStatus
} from './components'
import { Switch, Route, Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'
const App = () => {
  const client = useApolloClient()

  const [token, setToken] = useState(null)

  // to prevent logout after browser refresh, fingers crossed this doesn't cause bugs
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
        <Menu>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Sign Up</Link>
        </Menu>
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
        <Menu>
          <Link to='/expenses'>Expenses</Link>
          <Link to='/create_expense'>Create New</Link>
          <UserStatus handleCurrentUser={handleCurrentUser} />
          <button onClick={() => logout()}>Logout</button>
        </Menu>
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
