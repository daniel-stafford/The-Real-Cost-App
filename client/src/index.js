/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'semantic-ui-react'
import { StaticRouter } from 'react-router'
import App from './App'
import './index.css'

ReactDOM.render(
  <Container>
    <StaticRouter>
      <App />
    </StaticRouter>
  </Container>,
  document.getElementById('root')
)
