import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { hideNotification } from './utils/constants'
import {
  Notification,
  Home,
  LogInForm,
  RegisterUserForm,
  Summary
} from './components'
import { Menu } from 'semantic-ui-react'

const App = () => {
  const [loggedinUser, setLoggedinUser] = useState(null)
  console.log('loggedinUser app level', loggedinUser)

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem('real-cost-user')
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser)
      setLoggedinUser(user)
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

  if (!loggedinUser) {
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
        <Menu.Item active={activeItem === 'summary'}>
          <Link onClick={() => handleItemClick('summary')} to="/summary">
            Summary
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
      <Switch>
        <Route exact path={['/summary', '/']}>
          <Summary handleNotification={handleNotification} />
        </Route>
        {/* <Route exact path={['/expenses', '/']}>
          <ExpenseList handleNotification={handleNotification} />
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
        /> */}
      </Switch>
    </div>
  )
}

export default App
