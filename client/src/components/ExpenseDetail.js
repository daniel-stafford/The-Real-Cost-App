import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Loader,
  Header,
  Grid,
  Dropdown,
  Card,
  Popup,
  Container
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
      <>
        <div>
          <div>
            This is your details page for tracking your uses of {expense.title}.
            <br />
            <br />
          </div>
          <div>
            When was the last time you used {expense.title}? Choose a date with
            the button below.
            <br />
            <br />
          </div>
          <div>
            If you can't remember the last use, just choose any date. You can
            always change it later.
            <br />
            <br />
          </div>
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
          icon='add'
        />
      </>
    )
  const expensePrice = `Expense Price: ${expense.price}€`
  const expenseUses = `Number of Uses: ${expense.uses.length}`
  const expenseCost = `Current Cost Per Use: ${costPerUse(
    expense.price,
    expense.uses.length
  )}€`
  return (
    <Grid stackable centered>
      <Grid.Row columns={16}>
        <Grid.Column width={7} floated='right'>
          <Header as='h1'>{expense.title}</Header>
        </Grid.Column>
        <Grid.Column width={3}>
          <Dropdown
            direction='left'
            text='Options'
            icon='options'
            floating
            labeled
            button
            className='icon'
          >
            <Dropdown.Menu>
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
          <Popup
            content='Here are important details about your expense. Check out your current cost per use!  It is simply the expense price divided by the number of uses.'
            trigger={<h2>Current Stats</h2>}
          />
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
            icon='add'
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
            icon='minus'
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8} floated='left'>
          <Popup
            content='Here is a simple chart showing your current cost per uses and how it will decrease with further use. Check out how the cost per use lowers with one additional use (+1), five additional uses (+5) and ten additional uses (+10).  Good encouragement to increase those uses, huh?'
            trigger={<h2>Cost Per Use</h2>}
          />
          <CostChart expense={expense} className='expenseDetails__graph' />
        </Grid.Column>
        <Grid.Column width={8}>
          <Popup
            content='Go ahead and write any details about your expense here.  It could be encouragement, expiration dates, observations, whatever!'
            trigger={<h2>Notes</h2>}
          />
          <ul>
            {expense.notes.map(note => {
              return (
                <div className='expenseList__singleNote' key={note}>
                  <li>{note}</li>
                </div>
              )
            })}
          </ul>
          <AddNote
            id={expense.id}
            handleNotification={props.handleNotification}
            handleNewNote={handleNewNote}
            buttonText='Add another note'
            icon='write'
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ExpenseDetail
