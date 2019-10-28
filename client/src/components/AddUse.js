import React, { useState } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import expenseService from '../services/expenses'
import 'react-datepicker/dist/react-datepicker.css'

const AddUse = props => {
  const [startDate, setStartDate] = useState(undefined)
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = async () => {
    setShowModal(false)
    try {
      props.handleNewUse(startDate)
      const update = await expenseService.update(props.id, { startDate })
      console.log('update', update) //  not sure why this line isn't being read
    } catch (e) {
      console.log('add use failed', e.message)
    }
  }

  const handleChange = date => {
    setStartDate(date)
  }

  return (
    <Modal
      open={showModal}
      trigger={
        <Button color="green" onClick={() => setShowModal(true)}>
          Add Use
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Add a Use!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <DatePicker
              selected={startDate}
              onChange={handleChange}
              name="startDate"
              placeholderText="Choose a date!"
            />
            <div>
              <Button type="submit">Add it!</Button>
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
export default AddUse
