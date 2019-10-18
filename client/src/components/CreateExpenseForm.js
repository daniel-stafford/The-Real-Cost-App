import React from 'react'
import useField from '../hooks/useField'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import expenseService from '../services/expenses'

const CreateExpenseForm = ({ history, handleNotification, loggedinUser }) => {
  const title = useField('text')
  const price = useField('number')
  const notes = useField('text')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const newExpense = {
        title: title.value,
        price: parseFloat(price.value.replace(/,/g, '.')).toFixed(2),
        notes: notes.value,
        creator: loggedinUser.id
      }
      console.log('new expense', newExpense)

      await expenseService.create(newExpense)
      handleNotification(
        'success',
        "Nice! New expense created! Let's go see your updated expense list",
        3
      )
      setTimeout(() => {
        history.push('/expenses')
      }, 3000)
    } catch (error) {
      console.log(error.message)
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
          <label>Notes: </label>
          <input {...notes} />
        </div>
        <Button type="submit">Create New!</Button>
      </Form>
    </div>
  )
}

export default withRouter(CreateExpenseForm)
