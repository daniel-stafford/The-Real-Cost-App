import React, { useState } from 'react'
import { Form, Button, Modal, Icon } from 'semantic-ui-react'
import expenseService from '../services/expenses'
import 'react-datepicker/dist/react-datepicker.css'

const AddNote = props => {
  const [note, setNote] = useState('')
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = async () => {
    setShowModal(false)
    try {
      props.handleNewNote(note)
      await expenseService.update(props.id, { note })
      props.handleNotification('success', 'New note added!', 5)
    } catch (e) {
      props.handleNotification('error', 'Unable to add new note', 5)
    }
  }
  return (
    <Modal
      open={showModal}
      dimmer='blurring'
      trigger={
        <Button secondary onClick={() => setShowModal(true)}>
          <Icon name={props.icon} />
          {props.buttonText}
        </Button>
      }
      centered={false}
    >
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <div>
              Add a new note:
              <input
                type='text'
                value={note}
                onChange={({ target }) => setNote(target.value)}
              />
            </div>
            <div>
              <Button positive type='submit'>
                Add new note
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
export default AddNote
