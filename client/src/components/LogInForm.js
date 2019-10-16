import React, { useState } from 'react'
import loginService from '../services/login'
import Cookies from 'js-cookie'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    if (username.length === 0)
      return props.handleNotification('error', 'Please enter your username')
    if (password.length === 0)
      return props.handleNotification('error', 'Please enter your password')
    console.log('username', username, 'password', password)
    try {
      const loggedinUser = await loginService.login({
        username,
        password
      })
      Cookies.set('real-cost-user', JSON.stringify(loggedinUser), {
        expires: 7
      })
      props.handleNotification('success', `Nice, you're logged in`, 5)
    } catch (exception) {
      console.log('exception', exception)
      props.handleNotification('error', exception, 5)
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

export default LoginForm
