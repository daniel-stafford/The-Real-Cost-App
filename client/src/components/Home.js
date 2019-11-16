import React from 'react'
import { Button, Icon, Grid, Header } from 'semantic-ui-react'
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
    'Netflix subscription',
    'road bicycle',
    'unlimited yoga pass',
    'Amazon Prime'
  ]
  return (
    <Grid>
      <Grid.Column>
        <h1 className='home__primaryHeader'>The Real Cost App</h1>
        <Header as='h2' className='home__subheader'>
          Find out how much your{' '}
          <Typewriter
            options={{
              strings,
              autoStart: true,
              loop: true
            }}
          />
          really costs.
        </Header>
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
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Home)
