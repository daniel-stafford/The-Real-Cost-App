import React from 'react'
import useField from '../hooks/useField'
import { useMutation } from '@apollo/react-hooks'
import { ADD_EXPENSE } from '../graphQL/mutations'
import { ALL_EXPENSES } from '../graphQL/queries'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'

const CreateForm = ({ history, handleNotification }) => {
  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: ALL_EXPENSES }]
  })
  const title = useField('text')
  const price = useField('number')
  const notes = useField('text')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await addExpense({
        variables: {
          title: title.value,
          notes: notes.value,
          price: parseInt(price.value, 10)
        }
      })
      history.push('/expenses')
    } catch (error) {
      handleNotification('error', error.message)
      console.log('something went wrong with add expense')
    }
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

export default withRouter(CreateForm)
