import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import expenseService from './services/expenses'
import { hideNotification } from './utils/constants'
import { Notification, Home, LogInForm, RegisterForm } from './components'
import { Menu, Button } from 'semantic-ui-react'

const App = () => {
  const [expenses, setExpenses] = useState([])
  console.log('expenses', expenses)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    expenseService
      .getAll()
      .then(initialExpenses => {
        setExpenses(initialExpenses)
      })
      .catch(error => {
        console.log('error', error.message)
      })
  }, [])

  const [notification, setNotification] = useState(hideNotification)

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

  const [activeItem, setActiveItem] = useState('none')
  console.log('activeItem', activeItem)

  const handleItemClick = name => {
    console.log('handleItemClick', name)
    setActiveItem(name)
  }

  return (
    <div>
      <Menu pointing>
        <Menu.Item active={activeItem === 'home'}>
          <Link onClick={() => handleItemClick('home')} to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'login'}>
          <Link onClick={() => handleItemClick('login')} to="/login">
            Login
          </Link>
        </Menu.Item>
        <Menu.Item active={activeItem === 'register'}>
          <Link onClick={() => handleItemClick('register')} to="/register">
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
      <Notification notification={notification} />
      <Switch>
        <Route exact path="/login">
          <LoginForm
            setToken={setToken}
            handleNotification={handleNotification}
          />
        </Route>
        <Route exact path="/register">
          <RegisterForm handleNotification={handleNotification} />
        </Route>
        <Route exact path="/">
          <Home handleNotification={handleNotification} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
