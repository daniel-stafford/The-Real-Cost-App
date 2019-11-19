import React, { useState } from 'react'
import {
  Form,
  Button,
  Message,
  Popup,
  Icon,
  Grid,
  Container,
  Header
} from 'semantic-ui-react'
import userService from '../services/users'
import { withRouter } from 'react-router-dom'
import '../index.css'
import { formHelpIcon } from '../utils/constants'
import validator from 'validator'

const RegisterUserForm = props => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setDisabled(true)
    if (!validator.isEmail(email)) {
      setDisabled(false)
      return props.handleNotification(
        'error',
        'Please enter a valid email address'
      )
    }
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
      await userService.create({
        username: username.toLowerCase(),
        password,
        email
      })
      setPassword('')
      setUsername('')
      setEmail('')
      setPasswordConfirm('')

      props.handleNotification(
        'success',
        `Fantastic! New user created! Go ahead and log in. I'll take you there`,
        3
      )
      setTimeout(() => {
        props.history.push('/login')
        props.setActiveItem('login')
        props.handleNotification(
          'success',
          'Give me your username and password to log in',
          5
        )
      }, 3000)
    } catch (e) {
      props.handleNotification('error', e.response.data.error, 5)
      setDisabled(false)
    }
  }

  return (
    <>
      <Grid centered columns={10}>
        <Grid.Row>
          <Container text>
            <Grid.Column width={5}>
              <Header as='h1'>Sign Up</Header>
            </Grid.Column>
          </Container>
        </Grid.Row>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <div>
          Username{' '}
          <Popup
            content='Make sure your username is at least four characters long.'
            trigger={<Icon name={formHelpIcon} />}
          />
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Email{' '}
          <Popup
            content="Make sure you enter a valid email address.  But, don't worry, we won't spam you."
            trigger={<Icon name={formHelpIcon} />}
          />
          <input
            type='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <Popup
            content='Your password needs to be at least five characters long and remember that using lowercase or uppercase letters matters!'
            trigger={<Icon name={formHelpIcon} />}
          />
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          Confirm Password{' '}
          <Popup
            content='Retype your password.'
            trigger={<Icon name={formHelpIcon} />}
          />
          <input
            type='password'
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
          />
        </div>
        <div className='register__button'>
          <Button disabled={disabled} type='submit' positive>
            Sign me up!
          </Button>
        </div>
      </Form>
      <div className='register__warning'>
        <Message attached='bottom'>
          Already signed up?&nbsp;
          <a onClick={() => props.setActiveItem('login')} href='/login'>
            Login here
          </a>
          &nbsp;instead.
        </Message>
      </div>
    </>
  )
}

export default withRouter(RegisterUserForm)
