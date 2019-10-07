import React from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/react-hooks'
import { ADD_EXPENSE } from '../graphQL/mutations'
import { ALL_EXPENSES } from '../graphQL/queries'

import { Form, Button } from 'semantic-ui-react'

const CreateForm = () => {
  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const title = useField('text')
  const price = useField('number')
  const notes = useField('text')

  const handleSubmit = async e => {
    e.preventDefault()
    await addExpense({
      variables: {
        title: title.value,
        notes: notes.value,
        price: parseInt(price.value, 10)
      }
    })
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
        <Button type='submit'>Create New!</Button>
      </Form>
    </div>
  )
}

export default CreateForm
