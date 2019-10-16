import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import expenseService from './services/expenses'
import { hideNotification } from './utils/constants'
import { Notification, Home, LogInForm, RegisterForm } from './components'
import { Menu } from 'semantic-ui-react'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [user, setUser] = useState(null)
  console.log('current user', user)

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

  useEffect(() => {
    const loggedUserJSON = Cookies.get('real-cost-user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
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

  const handleItemClick = name => {
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
          <LogInForm
            handleNotification={handleNotification}
            setUser={setUser}
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
