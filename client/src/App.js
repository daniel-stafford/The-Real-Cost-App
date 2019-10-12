import React, { Component } from "react"

export default class App extends Component {
  state = { message: "Hello!" }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
