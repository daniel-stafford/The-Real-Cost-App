import React, { useState } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import expenseService from '../services/expenses'

const AddUse = props => {
  const [useQuantity, setUseQuantity] = useState(props.uses)
  console.log('add use props', props)
  const handleNewUse = async () => {
    try {
      await expenseService.update(props.id, { useQuantity })
      console.log('update has fired')
    } catch (e) {
      console.log('add use failed', e.message)
    }
  }

  return (
    <Modal trigger={<Button color="green">Add Use</Button>} centered={false}>
      <Modal.Header>Add a Use!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleNewUse}>
            <div>
              Number of Uses:
              <input
                value={useQuantity}
                onChange={({ target }) => setUseQuantity(target.value)}
              />
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
export default AddUse
