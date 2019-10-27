import React, { useState } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import expenseService from '../services/expenses'
import 'react-datepicker/dist/react-datepicker.css'

const AddUse = props => {
  const [startDate, setStartDate] = useState(undefined)
  const handleSubmit = async () => {
    try {
      await expenseService.update(props.id, { startDate })
      console.log('update has fired')
    } catch (e) {
      console.log('add use failed', e.message)
    }
  }

  const handleChange = date => {
    setStartDate(date)
  }

  return (
    <Modal trigger={<Button color="green">Add Use</Button>} centered={false}>
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
            <Button type="submit">Add it!</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
export default AddUse
