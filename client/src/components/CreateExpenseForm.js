import React, { useState } from 'react'
import useField from '../hooks/useField'
import {
  Form,
  Button,
  Icon,
  Popup,
  Grid,
  Container,
  Header
} from 'semantic-ui-react'
import { withRouter } from 'react-router'
import expenseService from '../services/expenses'
import { formHelpIcon } from '../utils/constants'
import '../index.css'

const CreateExpenseForm = ({ history, handleNotification, loggedinUser }) => {
  const title = useField('text')
  const price = useField('number')
  const notes = useField('text')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setDisabled(true)
    try {
      const newExpense = {
        title: title.value,
        price: parseFloat(price.value.replace(/,/g, '.')).toFixed(2),
        notes: notes.value,
        creator: loggedinUser.id
      }

      await expenseService.create(newExpense)
      handleNotification(
        'success',
        "Nice! New expense created! Let's go see your updated expense list.",
        3
      )
      setTimeout(() => {
        history.push('/expenses')
      }, 2000)
    } catch (error) {
      handleNotification(
        'error',
        'Unable to add new expense, make sure you have filled out the form correctly.',
        3
      )
      setDisabled(false)
    }
  }
  return (
    <div>
      <Grid centered columns={10}>
        <Grid.Row>
          <Container text>
            <Grid.Column width={5}>
              <Header as='h1'>Create New Expense</Header>
            </Grid.Column>
          </Container>
        </Grid.Row>
      </Grid>
      <Form onSubmit={handleSubmit}>
        <div>
          Title{' '}
          <Popup
            content="Give a title for your expense e.g. 'Gym Membership'."
            trigger={<Icon name={formHelpIcon} />}
          />
          <input {...title} />
        </div>
        <div>
          Price{' '}
          <Popup
            content="How much did your item or membership cost? e.g. if it costs 40 euros, just write '40'."
            trigger={<Icon name={formHelpIcon} />}
          />
          <input {...price} />
        </div>
        <div>
          Notes{' '}
          <Popup
            content="Add further details about your expense and any other information you'd like to remember. You can add notes at a later time, so no rush."
            trigger={<Icon name={formHelpIcon} />}
          />
          <input {...notes} />
        </div>
        <div>
          <Button
            positive
            disabled={disabled}
            type='submit'
            className='createExpense__button'
          >
            Create New Expense
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default withRouter(CreateExpenseForm)
