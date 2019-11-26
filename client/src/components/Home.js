import React, { useEffect } from 'react'
import { Button, Icon, Grid, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { useSpring, animated } from 'react-spring'

import '../index.css'

const Home = ({ handleNotification, setActiveItem, history }) => {
  useEffect(() => {
    handleNotification(
      'success',
      `Welcome! Feel free to login with the credentials username: user, password: password to quickly demo the app!`,
      5
    )
  }, [])
  const strings = [
    'gym membership',
    'metro pass',
    'Netflix subscription',
    'road bicycle',
    'unlimited yoga pass',
    'Amazon Prime'
  ]
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  })
  console.log('fade', fade)
  return (
    <Grid verticalAlign='middle' className='home__container'>
      <Grid.Column>
        <div className='home__content'>
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
              setActiveItem('register')
              history.push('/register')
            }}
            primary
            size='huge'
          >
            Sign up for free
            <Icon name='right arrow' />
          </Button>
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Home)
