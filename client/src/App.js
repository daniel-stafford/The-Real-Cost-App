import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
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
    content = 'Something went wrong!!!',
    time = 3
  ) => {
    setNotification({ category, content, time })
    setTimeout(() => {
      setNotification(hideNotification)
    }, time * 1000)
  }

  const logout = () => {
    handleNotification('success', `OK, Let me log you out!`, 3)
    setTimeout(() => {
      localStorage.clear()
      setLoggedinUser(null)
      props.history.push('/')
      handleNotification('success', `Come back soon!`, 4)
    }, 2000)
  }

  const [activeItem, setActiveItem] = useState('none')
  const handleItemClick = name => {
    setActiveItem(name)
  }

  if (!loggedinUser) {
    return (
      <div>
        <Menu stackable icon='labeled'>
          <Menu.Item
            as={Link}
            to='/'
            active={activeItem === 'home'}
            onClick={() => handleItemClick('home')}
          >
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/login'
              active={activeItem === 'login'}
              onClick={() => handleItemClick('login')}
            >
              <Icon name='sign-in' />
              Login
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/register'
              active={activeItem === 'register'}
              onClick={() => handleItemClick('register')}
            >
              <Icon name='signup' />
              Sign Up
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Notification notification={notification} />
        <Switch>
          <Route exact path='/login'>
            <LogInForm
              handleNotification={handleNotification}
              setLoggedinUser={setLoggedinUser}
            />
          </Route>
          <Route exact path='/register'>
            <RegisterUserForm
              handleNotification={handleNotification}
              setActiveItem={setActiveItem}
            />
          </Route>
          <Route exact path='/'>
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
      <Menu stackable icon='labeled'>
        <Menu.Item
          as={Link}
          to='/expenses'
          active={activeItem === 'expenses'}
          onClick={() => handleItemClick('expenses')}
        >
          <Icon name='grid layout' />
          My Expenses
        </Menu.Item>
        <Menu.Item
          as={Link}
          to='/create_expense'
          active={activeItem === 'create_expense'}
          onClick={() => handleItemClick('create_expense')}
        >
          <Icon name='write' />
          Create New Expense
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Icon name='user' />
            <UserStatus loggedinUser={loggedinUser} />
          </Menu.Item>
          <Menu.Item onClick={() => logout()}>
            <Icon name='sign-out' />
            Logout{' '}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Notification notification={notification} />
      <Switch>
        <Route exact path={['/expenses', '/']}>
          <ExpenseList
            handleNotification={handleNotification}
            loggedinUser={loggedinUser}
          />
        </Route>
        <Route exact path='/create_expense'>
          <CreateExpenseForm
            handleNotification={handleNotification}
            loggedinUser={loggedinUser}
          />
        </Route>
        <Route
          path='/expenses/:id'
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
