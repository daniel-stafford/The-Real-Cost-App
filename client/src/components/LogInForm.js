import React, { useState } from 'react'
import loginService from '../services/login'
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
      console.log('logininservice has fired', loggedinUser)
      window.localStorage.setItem(
        'real-cost-user',
        JSON.stringify(loggedinUser)
      )
      console.log('is this running?')
      props.handleNotification('success', `Nice, you're logged in`, 5)
      //have to reload page due to Heroku glitch (useEffect isn't being trigged),not needed on local build
      window.location.reload()
    } catch (exception) {
      console.log('exception', exception)
      props.handleNotification('error', exception.message, 5)
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
