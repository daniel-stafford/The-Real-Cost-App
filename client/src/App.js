import React from "react"
import { log } from "./utils/functions"

const App = props => {
  const blah = "some sort of text"
  log(blah)
  return (
    <div>
      {/* access via "pp" in vscode */}
      <pre>
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
      <p>Hello World</p>
    </div>
  )
}

export default App
