/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <Container inverted>
    <Router>
      <App />
    </Router>
  </Container>,
  document.getElementById('root')
)
