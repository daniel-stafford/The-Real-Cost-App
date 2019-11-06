import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
// import TextLoop from 'react-text-loop'
// import Typist from 'react-typist'
// import TypistLoop from 'react-typist-loop'

import '../index.css'

const Home = props => {
  // const loopingText = [
  //   'gym membership',
  //   'metro pass',
  //   'road bicycle',
  //   'Netflix subscription',
  //   'yoga membership',
  //   'Amazon Prime'
  // ]
  return (
    <div>
      <h1>The Real Cost App</h1>
      <h2>
        Find out how much your stuff{' '}
        {/* <TextLoop interval={1000}>
          {loopingText.map(text => (
            <span key={text}>{text}</span>
          ))}
        </TextLoop>{' '} */}
        really costs.
      </h2>

      <Button
        onClick={() => {
          props.setActiveItem('register')
          props.history.push('/register')
        }}
        primary
        size="huge"
      >
        Sign up for free
        <Icon name="right arrow" />
      </Button>
    </div>
  )
}

export default withRouter(Home)
