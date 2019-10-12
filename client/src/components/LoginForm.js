import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../graphQL/mutations'

import { Form, Button } from 'semantic-ui-react'

const LoginForm = props => {
  const [login] = useMutation(LOGIN, {
    onError: props.handleError
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async event => {
    event.preventDefault()
    if (username.length === 0)
      return props.handleNotification('error', 'Please enter your username')
    if (password.length === 0)
      return props.handleNotification('error', 'Please enter your password')
    try {
      const result = await login({
        variables: { username, password }
      })
      setPassword('')
      setUsername('')
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('token', token)
    } catch (e) {
      props.handleNotification('error', 'Incorrect username and/or password.')

      console.log(e)
    }
  }

  return (
    <div>
      <Form onSubmit={submit}>
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
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type='submit'>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm
