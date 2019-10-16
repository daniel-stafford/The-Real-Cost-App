import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import expenseService from './services/expenses'
import { hideNotification } from './utils/constants'
import { Notification, Home, LogInForm, RegisterForm } from './components'
import { Menu } from 'semantic-ui-react'

const App = () => {
  const [expenses, setExpenses] = useState([])
  console.log('expenses', expenses)
  const [token, setToken] = useState(null)
  console.log('current token', token)

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
    const loggedUserJSON = window.localStorage.getItem('real-cost-user')
    if (loggedUserJSON) {
      const token = JSON.parse(loggedUserJSON)
      setToken(token)
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

  if (!token) {
    return (
      // logged out user
      <div>
        {console.log('App is rendering')}
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
              setToken={setToken}
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
  // user logged in
  return (
    <div>
      <Menu tabular>
        <Menu.Item active={activeItem === 'expenses'}>
          <Link onClick={() => handleItemClick('expenses')} to="/expenses">
            Expenses
          </Link>
        </Menu.Item>
        {/* <Menu.Item active={activeItem === 'create_expense'}>
          <Link
            onClick={() => handleItemClick('create_expense')}
            to="/create_expense"
          >
            Create New
          </Link>
        </Menu.Item>
        <Menu.Item>
          <UserStatus handleCurrentUser={handleCurrentUser} />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => logout()}>Logout</Button>
        </Menu.Item> */}
      </Menu>
      <Notification notification={notification} />
      {/* <Switch>
        <Route exact path={['/expenses', '/']}>
          <ExpenseList handleNotification={handleNotification} user={user} />
        </Route>
        <Route exact path="/create_expense">
          <CreateForm handleNotification={handleNotification} />
        </Route>
        <Route
          path="/expenses/:id"
          exact
          render={({ match }) => (
            <ExpenseDetail
              id={match.params.id}
              handleNotification={handleNotification}
            />
          )}
        />
      </Switch> */}
    </div>
  )
}

export default App
