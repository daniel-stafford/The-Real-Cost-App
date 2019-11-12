import React from 'react'
import { Button, Icon, Container } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
// import TextLoop from 'react-text-loop'
// import Typist from 'react-typist'
// import TypistLoop from 'react-typist-loop'

import '../index.css'

const Home = props => {
  const strings = [
    'gym membership',
    'metro pass',
    'road bicycle',
    'Netflix subscription',
    'yoga membership',
    'Amazon Prime'
  ]
  return (
    <Container>
      <h1>The Real Cost App</h1>
      <h2 className='home__subheader'>
        Find out how much your{' '}
        <Typewriter
          options={{
            strings,
            autoStart: true,
            loop: true
          }}
        />
        really costs.
      </h2>

      <Button
        onClick={() => {
          props.setActiveItem('register')
          props.history.push('/register')
        }}
        primary
        size='huge'
      >
        Sign up for free
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
}

export default withRouter(Home)
