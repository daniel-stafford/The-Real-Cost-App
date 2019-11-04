import React, { useState } from 'react'
import { Form, Button, Message, Popup } from 'semantic-ui-react'
import userService from '../services/users'
import { withRouter } from 'react-router-dom'
import '../index.css'

const RegisterUserForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setDisabled(true)
    if (password !== passwordConfirm) {
      setDisabled(false)
      return props.handleNotification(
        'error',
        "Your passwords don't match.  Please try again"
      )
    }

    if (password.length < 5) {
      setDisabled(false)
      return props.handleNotification(
        'error',
        'Password must be longer than 5 characters'
      )
    }

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
        props.setActiveItem('login')
        props.handleNotification(
          'success',
          'Give me your username and password to log in',
          5
        )
      }, 3000)
    } catch (e) {
      console.log('catch is running', e.response)
      props.handleNotification('error', e.response.data.error)
      setDisabled(false)
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          Username
          <Popup
            content="Make sure your username is at least four characters long."
            trigger={
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            }
          />
        </div>
        <div>
          Password
          <Popup
            content="Your password needs to be at least five characters long."
            trigger={
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            }
          />
        </div>
        <div>
          Confirm Password
          <Popup
            content="Rewrite your password here."
            trigger={
              <input
                type="password"
                value={passwordConfirm}
                onChange={({ target }) => setPasswordConfirm(target.value)}
              />
            }
          />
        </div>
        <div className="register__button">
          <Button disabled={disabled} type="submit" positive>
            Sign me up!
          </Button>
        </div>
      </Form>
      <div className="register__warning">
        <Message attached="bottom">
          Already signed up?&nbsp;
          <a onClick={() => props.setActiveItem('login')} href="/login">
            Login here
          </a>
          &nbsp;instead.
        </Message>
      </div>
    </div>
  )
}

export default withRouter(RegisterUserForm)
