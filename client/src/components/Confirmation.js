import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class Confirmation extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  handleConfirm = () => {
    this.setState({ open: false })
    return true
  }
  handleCancel = () => {
    this.setState({ open: false })
    return false
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>Show</Button>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default Confirmation
