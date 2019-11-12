import React, { useState } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import expenseService from '../services/expenses'
import 'react-datepicker/dist/react-datepicker.css'

const AddUse = props => {
  const [date, setDate] = useState(undefined)
  const [showModal, setShowModal] = useState(false)
  console.log('buttonType', props.buttonType)
  const handleSubmit = async () => {
    setShowModal(false)
    try {
      props.handleNewUse(date)
      props.handleNotification('success', 'New use added!', 5)
      await expenseService.update(props.id, { date })
    } catch (e) {
      props.handleNotification('error', 'Unable to add new use', 5)
    }
  }

  const handleChange = date => {
    setDate(date)
  }

  return (
    <Modal
      open={showModal}
      trigger={
        <Button
          positive={props.isPositive}
          negative={props.isNegative}
          onClick={() => setShowModal(true)}
        >
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
              selected={date}
              onChange={handleChange}
              name='date'
              placeholderText='Choose a date!'
            />
            <div>
              <Button positive type='submit'>
                Add new use
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
