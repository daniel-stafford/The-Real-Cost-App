/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
import App from './App'
import './index.css'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
