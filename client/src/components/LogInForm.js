import React, { useState } from 'react'
import loginService from '../services/login'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    if (username.length === 0)
      return props.handleNotification('error', 'Please enter your username')
    if (password.length === 0)
      return props.handleNotification('error', 'Please enter your password')
    try {
      const loggedinUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem(
        'real-cost-user',
        JSON.stringify(loggedinUser)
      )
      props.handleNotification(
        'success',
        `Nice, you're logged in! Let me take you to your expenses page`,
        2
      )
      setTimeout(() => {
        props.setLoggedinUser(loggedinUser)
        props.history.push('/expenses')
      }, 2000)
    } catch (exception) {
      props.handleNotification(
        'error',
        'Login failed. Check your username and/or password.',
        5
      )
    }
  }
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

export default withRouter(LoginForm)
