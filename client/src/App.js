import React, { Component } from "react"

export default class App extends Component {
  state = { loading: true }
  render() {
    return <div>{this.state.loading}</div>
  }
}
