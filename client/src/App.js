import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

import { hideNotification } from './utils/constants'
import {
  Notification,
  Home,
  LogInForm,
  RegisterUserForm,
  UserStatus,
  ExpenseList,
  CreateExpenseForm,
  ExpenseDetail
} from './components'
import expenseService from './services/expenses'

const App = props => {
  const [loggedinUser, setLoggedinUser] = useState(null)

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('real-cost-user')
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      setLoggedinUser(user)
      expenseService.setToken(loggedinUser.token)
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

  const logout = () => {
    handleNotification('success', `OK, Let me log you out`, 2)
    setTimeout(() => {
      localStorage.clear()
      setLoggedinUser(null)
      props.history.push('/')
      handleNotification('success', `Come back soon!`, 3)
    }, 2000)
  }

  const [activeItem, setActiveItem] = useState('none')
  const handleItemClick = name => {
    setActiveItem(name)
  }

  const getExpenseByID = async id => {
    const response = await expenseService.getAll()
    const result = response.expenses.filter(e => e.id === id)
    return result
  }

  if (!loggedinUser) {
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
              setLoggedinUser={setLoggedinUser}
            />
          </Route>
          <Route exact path="/register">
            <RegisterUserForm handleNotification={handleNotification} />
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
        <Menu.Item active={activeItem === 'create_expense'}>
          <Link
            onClick={() => handleItemClick('create_expense')}
            to="/create_expense"
          >
            Create New
          </Link>
        </Menu.Item>
        <Menu.Item>
          <UserStatus loggedinUser={loggedinUser} />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => logout()}>Logout</Button>
        </Menu.Item>
      </Menu>
      <Notification notification={notification} />
      <Switch>
        <Route exact path={['/expenses', '/']}>
          <ExpenseList
            handleNotification={handleNotification}
            loggedinUser={loggedinUser}
          />
        </Route>
        <Route exact path="/create_expense">
          <CreateExpenseForm
            handleNotification={handleNotification}
            loggedinUser={loggedinUser}
          />
        </Route>
        <Route
          path="/expenses/:id"
          exact
          render={({ match }) => (
            <ExpenseDetail
              id={match.params.id}
              handleNotification={handleNotification}
              expense={getExpenseByID(match.params.id)}
              loggedinUser={loggedinUser}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default withRouter(App)
