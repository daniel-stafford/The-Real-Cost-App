import React from 'react'
import { Container, Header, Button, Icon } from 'semantic-ui-react'
import img from '../resources/images/dollars.jpg'
import '../index.css'

const Home = () => {
  const HomepageHeading = ({ mobile }) => (
    <Container text className="header-container">
      <Header
        as="h1"
        content="The Real Cost App"
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em'
        }}
      />
      <Header
        as="h2"
        content="Track how much your memberships cost per use."
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em'
        }}
      />
      <Button primary size="huge">
        Sign up for Free
        <Icon name="right arrow" />
      </Button>
    </Container>
  )
  return <HomepageHeading />
}

export default Home
