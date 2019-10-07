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

import { Menu, Button } from 'semantic-ui-react'
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

  const [activeItem, setActiveItem] = useState('home')
  console.log('activeItem', activeItem)

  const handleItemClick = name => {
    console.log('handleItemClick', name)
    setActiveItem(name)
  }

  if (!token) {
    return (
      <div>
        <Menu pointing>
          <Menu.Item active={activeItem === 'home'}>
            <Link onClick={() => handleItemClick('home')} to='/'>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item active={activeItem === 'login'}>
            <Link onClick={() => handleItemClick('login')} to='/login'>
              Login
            </Link>
          </Menu.Item>
          <Menu.Item active={activeItem === 'register'}>
            <Link onClick={() => handleItemClick('register')} to='/register'>
              Sign Up
            </Link>
          </Menu.Item>
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
        <Menu tabular>
          <Menu.Item>
            <Link to='/expenses'>Expenses</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/create_expense'>Create New</Link>
          </Menu.Item>
          <Menu.Item>
            <UserStatus handleCurrentUser={handleCurrentUser} />
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => logout()}>Logout</Button>
          </Menu.Item>
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
