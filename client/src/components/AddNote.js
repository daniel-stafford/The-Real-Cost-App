import React, { useState } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
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
      trigger={
        <Button positive onClick={() => setShowModal(true)}>
          {props.buttonText}
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Add a new note!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <div>
              New Note:
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
