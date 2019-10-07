import React from 'react'

const MenuLoggedIn = () => {
  return (
    <div>
      <div>
        <button onClick={() => setPage('signin')}>Sign In</button>
        <button onClick={() => setPage('signup')}>Sign Up</button>
      </div>
    </div>
  )
}

export default MenuLoggedIn
