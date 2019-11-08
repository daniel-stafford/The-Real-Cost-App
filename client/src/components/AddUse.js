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
      props.handleNotification('success', 'New use added!', 5)
      await expenseService.update(props.id, { startDate })
    } catch (e) {
      props.handleNotification('error', 'Unable to add new use', 5)
    }
  }

  const handleChange = date => {
    setStartDate(date)
  }

  return (
    <Modal
      open={showModal}
      trigger={
        <Button positive onClick={() => setShowModal(true)}>
          {props.buttonText}
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
              <Button positive type="submit">
                Add!
              </Button>
              <Button
                negative
                onClick={e => {
                  e.preventDefault()
                  setShowModal(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
export default AddUse
