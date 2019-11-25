import React from 'react'
import { Icon } from 'semantic-ui-react'
import '../index.css'
const Footer = () => {
  return (
    <footer>
      Created by Daniel Stafford{' '}
      <a href='https://www.danielrstafford.com' target='_blank'>
        <Icon link name='talk' />
      </a>
      <a href='https://github.com/daniel-stafford' target='_blank'>
        <Icon link name='github' />
      </a>
      <a href='https://www.linkedin.com/in/danielrstafford/' target='_blank'>
        <Icon link name='linkedin' />
      </a>
    </footer>
  )
}

export default Footer
