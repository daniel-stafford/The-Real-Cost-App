import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Container,
  Loader,
  Header,
  Grid,
  Dropdown,
  Card,
  Popup,
  Button
} from 'semantic-ui-react'
import {
  DeleteExpense,
  EditUseButton,
  CostChart,
  ExpenseCalendar,
  AddNote
} from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import '../index.css'

const ExpenseDetail = props => {
  const [expense, setExpense] = useState(null)

  /*eslint-disable */
  useEffect(() => {
    let isSubscribed = true

    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll(props.id).then(response => {
      setExpense(...response.expenses.filter(e => e.id === props.id))
    })
    return () => (isSubscribed = false)
  }, [])
  /*eslint-enable */

  const handleNewUse = newDate => {
    setExpense({ ...expense, uses: expense.uses.concat(newDate) })
  }

  const handleRemoveUse = newDate => {
    setExpense({
      ...expense,
      uses: expense.uses.filter(
        use =>
          moment(use).format('MMM Do YY') !==
          moment(newDate).format('MMM Do YY')
      )
    })
  }

  const handleNewNote = newNote => {
    setExpense({ ...expense, notes: expense.notes.concat(newNote) })
  }

  if (!expense) return <Loader active />
  if (expense.title && expense.uses.length === 0)
    return (
      <div>
        <Header as='h1'>{expense.title}</Header>
        <div>
          <p>
            This is your details page for tracking your uses of each expense.
          </p>
          <p>
            When was the last time you used your expense? Choose a date with
            button below.
          </p>
        </div>
        <EditUseButton
          id={expense.id}
          uses={expense.uses}
          handleNotification={props.handleNotification}
          handleNewUse={handleNewUse}
          modalHeader='Adding first use'
          buttonText='Add use'
          modalActionButtonText='Add use'
          expense={expense}
          isPositive
          isAddUse
        />
      </div>
    )
  const expensePrice = `Expense Price: ${expense.price}€`
  const expenseUses = `Number of Uses: ${expense.uses.length}`
  const expenseCost = `Current Cost Per Use: ${costPerUse(
    expense.price,
    expense.uses.length
  )}€`
  return (
    <Grid centered>
      <Grid.Row columns={16}>
        <Container text>
          <Header as='h1'>{expense.title}</Header>
        </Container>
        <Grid.Column floated='right'>
          <Dropdown text='Options'>
            <Dropdown.Menu direction='left'>
              <Dropdown.Item>
                <DeleteExpense
                  id={expense.id}
                  title={expense.title}
                  uses={expense.uses}
                  handleNotification={props.handleNotification}
                  className='button icon'
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <h2>Current Stats </h2>{' '}
          <Card.Group>
            <Card fluid color='red' header={expensePrice} />
            <Card fluid color='orange' header={expenseUses} />
            <Card fluid color='green' header={expenseCost} />
          </Card.Group>
          {/* <ul>
            <li>Last Updated: {moment(expense.updatedAt).calendar()}</li>
            <li>Created: {moment(expense.createdAt).calendar()}</li>
          </ul> */}
        </Grid.Column>
        <Grid.Column width={8}>
          <Popup
            content='Your uses are displayed on this calendar. Note that you can only record one use per day.'
            trigger={<h2>Recorded Uses</h2>}
          />
          <ExpenseCalendar uses={expense.uses} />
          <EditUseButton
            id={expense.id}
            uses={expense.uses}
            handleNotification={props.handleNotification}
            handleNewUse={handleNewUse}
            modalHeader='Adding a use'
            buttonText='Add use'
            modalActionButtonText='Add use'
            isPositive
            isAddUse
            expense={expense}
          />
          <EditUseButton
            id={expense.id}
            uses={expense.uses}
            handleNotification={props.handleNotification}
            handleNewUse={handleNewUse}
            modalHeader='Removing a use'
            buttonText='Remove use'
            modalActionButtonText='Remove use'
            isNegative
            handleRemoveUse={handleRemoveUse}
            expense={expense}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} floated='left'>
          <h2>Cost Per Use</h2>
          <CostChart expense={expense} className='expenseDetails__graph' />
        </Grid.Column>
        <Grid.Column width={8}>
          <h2>Notes</h2>
          <ul>
            {expense.notes.map(note => {
              return (
                <div className='expenseList__singleNote' key={note}>
                  <li>
                    {note}{' '}
                    <Button
                      className='expenseList__deleteNote'
                      icon='trash alternate'
                    />
                  </li>
                </div>
              )
            })}
          </ul>
          <AddNote
            id={expense.id}
            handleNotification={props.handleNotification}
            handleNewNote={handleNewNote}
            buttonText='Add another note'
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ExpenseDetail
