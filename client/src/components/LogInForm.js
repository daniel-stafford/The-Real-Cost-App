import React, { useState } from 'react'
import loginService from '../services/login'

import { Form, Button } from 'semantic-ui-react'

const LoginForm = props => {
  const handleLogin = async event => {
    event.preventDefault()
    if (username.length === 0)
      return props.setNotification('error', 'Please enter your username')
    if (password.length === 0)
      return props.setNotification('error', 'Please enter your password')
    try {
      const loggedinUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('user', JSON.stringify(loggedinUser))
      props.setNotification('Correct credentials', 'success', 5)
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
