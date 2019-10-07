import React, { useState } from 'react'

const LoginForm = props => {
  console.log('loginform props', props)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async event => {
    event.preventDefault()
    try {
      const result = await props.login({
        variables: { username, password }
      })
      setPassword('')
      setUsername('')

      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('token', token)

      console.log('localStorage', localStorage)
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
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          email
          <input
            value={email}
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
        <button type='submit'>signup</button>
      </form>
    </div>
  )
}

export default LoginForm
