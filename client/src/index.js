/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Container>
      <App />
    </Container>
  </Router>,
  document.getElementById('root')
)
