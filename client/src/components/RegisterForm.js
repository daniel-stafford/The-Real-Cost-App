import React, { useState } from 'react'
import { CREATE_USER } from '../graphQL/mutations'
import { useMutation } from '@apollo/react-hooks'
import { Form, Button, Message } from 'semantic-ui-react'

const RegisterForm = props => {
  const [createUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const submit = async event => {
    event.preventDefault()
    if (password !== passwordConfirm)
      return props.handleNotification(
        'error',
        "Your passwords don't match.  Please try again"
      )
    if (password.length < 5)
      return props.handleNotification(
        'error',
        'Password must be longer than 5 characters'
      )
    try {
      const result = await createUser({
        variables: { username, password }
      })
      setPassword('')
      setUsername('')
      props.handleNotification('success', 'Fantastic! New user created!')

      console.log('user created!', result)
    } catch (e) {
      console.log(e)
      props.onError(e)
    }
  }

  return (
    <div>
      <Form onSubmit={submit}>
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
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          Confirm Password
          <input
            type='password'
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
          />
        </div>
        <Button type='submit'>signup</Button>
      </Form>
      <Message attached='bottom' warning>
        Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
      </Message>
    </div>
  )
}

export default RegisterForm
