import React from 'react'
import styled from 'styled-components'
import img from '../resources/images/dollars.jpg'

const Home = () => {
  const Header = styled.div`
    height: 95vh;
    color: white;
    background-image: linear-gradient(
        to right bottom,
        rgba(22, 10, 5, 0.8),
        rgba(100, 200, 100, 0.8)
      ),
      url(${img});
    background-size: cover;
    background-position: top;
    text-align: center;
    /* -webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%); */
    position: relative;
  `
  return (
    <Header>
      <div>
        <h1>Welcome to the Real Cost App</h1>
      </div>
    </Header>
  )
}

export default Home
