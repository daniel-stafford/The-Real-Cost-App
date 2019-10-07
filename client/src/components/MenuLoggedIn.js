import React from 'react'

const MenuLoggedIn = () => {
  return (
    <div>
      <div>
        <button onClick={() => setPage('expenses')}>authors</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

export default MenuLoggedIn
