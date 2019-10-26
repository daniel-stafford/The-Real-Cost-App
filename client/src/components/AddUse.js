import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { DatePicker } from './index'
const AddUse = () => (
  <Modal trigger={<Button>Add Use</Button>} centered={false}>
    <Modal.Header>Add a Use!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <DatePicker />
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default AddUse
