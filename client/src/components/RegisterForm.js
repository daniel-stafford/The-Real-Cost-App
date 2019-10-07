import React, { useState } from 'react'
import { CREATE_USER } from '../graphQL/mutations'
import { useMutation } from '@apollo/react-hooks'

const LoginForm = props => {
  const [createUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async event => {
    event.preventDefault()
    try {
      const result = await createUser({
        variables: { username, password }
      })
      setPassword('')
      setUsername('')
      console.log('loginform result', result)
    } catch (e) {
      props.onError(e)
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          email
          <input
            type='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
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
        <button type='submit'>signup</button>
      </form>
    </div>
  )
}

export default LoginForm
