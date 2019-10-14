import React from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    axios.get('/api').then(response => {
      setUser(response.data)
    })
  }, [])

  return (
    user && (
      <div className="App">
        <header className="App-header">
          <img src={user.user.avatar_url} className="App-logo" alt="logo" />
          <p>{user.user.login}!!</p>
        </header>
      </div>
    )
  )
}

export default App
