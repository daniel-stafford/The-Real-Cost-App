/* eslint-env browser */

import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
import App from './App'
import './index.css'

const Wrapper = styled.div``
ReactDOM.render(
  <Wrapper>
    <Router>
      <App />
    </Router>
  </Wrapper>,
  document.getElementById('root')
)
