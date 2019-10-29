import React from 'react'
import styled from 'styled-components'

const Summary = () => {
  const Header = styled.div`
    background-color: black;
    color: white
    min-height: 200px;
    margin: 30px auto;
    box-sizing: border-box;
  `
  return (
    <div>
      <Header>
        <h1>Welcome to the Real Cost App</h1>
      </Header>
    </div>
  )
}

export default Summary
