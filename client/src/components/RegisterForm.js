import React, { useState } from 'react'
import { CREATE_USER } from '../graphQL/mutations'
import { useMutation } from '@apollo/react-hooks'

import { Form, Button } from 'semantic-ui-react'

const RegisterForm = props => {
  const [createUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async event => {
    event.preventDefault()
    try {
      const result = await createUser({
        variables: { username, password }
      })
      setPassword('')
      setUsername('')
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
        <Button type='submit'>signup</Button>
      </Form>
    </div>
  )
}

export default RegisterForm
