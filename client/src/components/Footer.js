import React, { Component } from "react"
import ThemeContext from "./ThemeContext"

export default class Footer extends Component {
  state = { message: "I'm a footer" }
  render() {
    return (
      <div>
        <ThemeContext.Consumer>
          {theme => <p>{theme}!!!</p>}
        </ThemeContext.Consumer>
      </div>
    )
  }
}
