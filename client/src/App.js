import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import {
  CreateForm,
  ExpenseList,
  LoginForm,
  RegisterForm,
  Home,
  UserStatus,
  Notification,
  ExpenseDetail
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
  const hideNotification = { category: 'hide', content: '', time: 0 }
  const [notification, setNotification] = useState(hideNotification)

  const handleError = error => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleNotification = (
    category = 'error',
    content = 'Something went wrong',
    time = 3
  ) => {
    setNotification({ category, content, time })
    setTimeout(() => {
      setNotification(hideNotification)
    }, time * 1000)
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
        <Notification notification={notification} />
        <Switch>
          <Route exact path='/login'>
            <LoginForm
              setToken={setToken}
              onError={handleError}
              handleNotification={handleNotification}
            />
          </Route>
          <Route exact path='/register'>
            <RegisterForm
              onError={handleError}
              handleNotification={handleNotification}
            />
          </Route>
          <Route exact path='/'>
            <Home handleNotification={handleNotification} />
          </Route>
        </Switch>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
    )
  }
  return (
    <div>
      <Menu tabular>
        <Menu.Item active={activeItem === 'expenses'}>
          <Link onClick={() => handleItemClick('expenses')} to='/expenses'>
            Expenses
          </Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'create_expense'}>
          <Link
            onClick={() => handleItemClick('create_expense')}
            to='/create_expense'
            handleNotification={handleNotification}
          >
            Create New
          </Link>
        </Menu.Item>
        <Menu.Item>
          <UserStatus handleCurrentUser={handleCurrentUser} />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => logout()}>Logout</Button>
        </Menu.Item>
      </Menu>
      <Notification notification={notification} />
      <Switch>
        <Route exact path='/expenses'>
          <ExpenseList
            onError={handleError}
            handleNotification={handleNotification}
          />
        </Route>
        <Route exact path='/create_expense'>
          <CreateForm
            onError={handleError}
            handleNotification={handleNotification}
          />
        </Route>
        <Route
          path='/expenses/:id'
          exact
          render={({ match }) => (
            <ExpenseDetail
              id={match.params.id}
              handleNotification={handleNotification}
            />
          )}
        />
      </Switch>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default App
