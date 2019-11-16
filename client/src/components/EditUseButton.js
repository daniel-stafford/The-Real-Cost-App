import React, { useState } from 'react'
import { Form, Button, Modal, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import expenseService from '../services/expenses'
import 'react-datepicker/dist/react-datepicker.css'

const EditUseButton = props => {
  const [date, setDate] = useState(undefined)
  const [showModal, setShowModal] = useState(false)
  const handleAddSubmit = async () => {
    setShowModal(false)
    if (
      props.expense.uses.filter(
        use =>
          moment(use).format('MMM Do YY') === moment(date).format('MMM Do YY')
      ).length > 0
    )
      return props.handleNotification('error', 'Only one use per day', 5)

    try {
      props.handleNewUse(date)
      await expenseService.update(props.id, { dateToAdd: date })
      setDate(undefined)
      props.handleNotification('success', 'New use added!', 5)
    } catch (e) {
      setDate(undefined)
      props.handleNotification('error', 'Unable to add new use', 5)
    }
  }
  const handleRemoveSubmit = async () => {
    setShowModal(false)
    try {
      props.handleRemoveUse(date)
      await expenseService.update(props.id, { dateToRemove: date })
      setDate(undefined)
      props.handleNotification('success', 'Use removed!', 5)
    } catch (e) {
      setDate(undefined)
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
          <Icon name={props.icon} />
          {props.buttonText}
        </Button>
      }
      centered={false}
    >
      <Modal.Header>{props.modalHeader}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form
            onSubmit={props.isAddUse ? handleAddSubmit : handleRemoveSubmit}
          >
            <DatePicker
              selected={date}
              onChange={handleChange}
              name='date'
              placeholderText='Choose a date'
            />
            <div>
              <Button positive type='submit'>
                {props.modalActionButtonText}
              </Button>
              <Button
                negative
                onClick={e => {
                  e.preventDefault()
                  setShowModal(false)
                  setDate(undefined)
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
export default EditUseButton
