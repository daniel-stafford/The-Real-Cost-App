import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
class Confirmation extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  handleConfirm = () => {
    this.setState({ open: false })
    this.props.handleDelete(true)
  }
  handleCancel = () => {
    this.setState({ open: false })
    this.props.handleDelete(false)
  }

  render() {
    return (
      <div>
        {/* <Button basic color="red" onClick={() => handleDelete(props.id)}>
          Delete
      </Button> */}
        <Button negative onClick={this.show}>
          Delete This Membership
        </Button>
        <Confirm
          open={this.state.open}
          onCancel={this.handleCancel}
          content={`Are you sure you want to delete ${this.props.title}?`}
          cancelButton="Never mind."
          confirmButton="Trash it!"
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

export default Confirmation
