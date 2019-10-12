import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import ThemeContext from "./components/ThemeContext"

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider>
      <App name={"Daniel"} />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
