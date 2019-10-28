import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import userService from '../services/users'
import { withRouter } from 'react-router-dom'

const RegisterUserForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [disabled, setDisabled] = useState(false)
  console.log('register use form disable', disabled)

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('before set disabled', disabled)
    setDisabled(true)
    console.log('after set disabled', disabled)
    if (password !== passwordConfirm) {
      props.handleNotification(
        'error',
        "Your passwords don't match.  Please try again"
      )
      return setDisabled(false)
    }
    if (password.length < 5)
      return props.handleNotification(
        'error',
        'Password must be longer than 5 characters'
      )
    try {
      await userService.create({ username, password })
      setPassword('')
      setUsername('')
      setPasswordConfirm('')

      props.handleNotification(
        'success',
        `Fantastic! New user created! Go ahead and log in. I'll take you there`,
        3
      )
      setTimeout(params => {
        props.history.push('/login')
        props.handleNotification(
          'success',
          'Give me your new username and password to log in',
          5
        )
      }, 3000)
    } catch (e) {
      props.handleNotification('error', e.message)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          Confirm Password
          <input
            type="password"
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
          />
        </div>
        <Button disabled={disabled} type="submit">
          signup
        </Button>
      </Form>
      <Message attached="bottom" warning>
        Already signed up?&nbsp;<a href="/login">Login here</a>&nbsp;instead.
      </Message>
    </div>
  )
}

export default withRouter(RegisterUserForm)
