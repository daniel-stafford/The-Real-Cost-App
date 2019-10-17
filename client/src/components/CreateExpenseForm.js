import React from 'react'
import useField from '../hooks/useField'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'

const CreateExpenseForm = ({ history, handleNotification }) => {
  const title = useField('text')
  const price = useField('number')
  const notes = useField('text')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(
      'new price',
      parseFloat(price.value.replace(/,/g, '.')).toFixed(2)
    )
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input {...title} />
        </div>
        <div>
          <label>Price: </label>
          <input {...price} />
        </div>
        <div>
          <label>Notes: </label>
          <input {...notes} />
        </div>
        <Button type="submit">Create New!</Button>
      </Form>
    </div>
  )
}

export default withRouter(CreateExpenseForm)
