import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, withRouter, NavLink } from 'react-router-dom'
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
      expenseService.setToken(userInStorage.token)
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

  if (!loggedinUser) {
    return (
      <div>
        <Menu pointing>
          <Menu.Item
            as={Link}
            to="/"
            active={activeItem === 'home'}
            onClick={() => handleItemClick('home')}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/login"
            active={activeItem === 'login'}
            onClick={() => handleItemClick('login')}
          >
            Login
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/register"
            active={activeItem === 'register'}
            onClick={() => handleItemClick('register')}
          >
            Sign Up
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
            <RegisterUserForm
              handleNotification={handleNotification}
              setActiveItem={setActiveItem}
            />
          </Route>
          <Route exact path="/">
            <Home
              handleNotification={handleNotification}
              setActiveItem={setActiveItem}
            />
          </Route>
        </Switch>
      </div>
    )
  }
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
              loggedinUser={loggedinUser}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default withRouter(App)
