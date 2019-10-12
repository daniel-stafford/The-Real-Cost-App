import React from "react"

const App = props => {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
      <p>Hello World</p>
    </div>
  )
}

export default App
