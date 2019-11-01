import React, { useEffect, useState } from 'react'
import { Container, Loader, Header, Grid } from 'semantic-ui-react'
import {
  DeleteExpense,
  AddUse,
  CostChart,
  ExpenseCalendar
} from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import moment from 'moment'
import '../index.css'

const ExpenseDetail = props => {
  const [expense, setExpense] = useState(null)
  console.log('expense detail state', expense)

  /*eslint-disable */
  useEffect(() => {
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll(props.id).then(response => {
      setExpense(...response.expenses.filter(e => e.id === props.id))
    })
  }, [])
  /*eslint-enable */

  const handleNewUse = startDate => {
    setExpense({ ...expense, uses: expense.uses.concat(startDate) })
  }

  if (!expense) return <Loader active />
  if (expense.uses.length === 0)
    return (
      <div>
        <Header as="h1">{expense.title}</Header>
        <div>
          <p>
            This is your details page for tracking your uses of each membership.{' '}
          </p>
          <p>
            When was the last time you used your membership? Go ahead and add a
            use below.
          </p>
        </div>
        <AddUse
          id={expense.id}
          uses={expense.uses}
          handleNotification={props.handleNotification}
          handleNewUse={handleNewUse}
        />
      </div>
    )
  return (
    <Grid>
      <Grid.Row centered columns={16}>
        <Container text>
          <Header as="h1">{expense.title}</Header>
        </Container>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6}>
          <h2>Current Stats</h2>
          <ul>
            <li>Membership Price: {expense.price}</li>
            <li>Number of Uses: {expense.uses.length}</li>
            <li>
              Current Cost Per Use:
              {costPerUse(expense.price, expense.uses.length)}
            </li>
            <li>Notes: {expense.notes}</li>
            <li>Last Updated: {moment(expense.updatedAt).calendar()}</li>
            <li>Created: {moment(expense.createdAt).calendar()}</li>
          </ul>
        </Grid.Column>
        <Grid.Column width={10} floated="right">
          <div className="expenseDetails__graph">
            <CostChart expense={expense} className="expenseDetails__graph" />
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <h2>Recorded uses</h2>
          <ExpenseCalendar uses={expense.uses} />
          <AddUse
            id={expense.id}
            uses={expense.uses}
            handleNotification={props.handleNotification}
            handleNewUse={handleNewUse}
            buttonText="Add another use"
          />
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          <div>
            <DeleteExpense
              id={expense.id}
              title={expense.title}
              uses={expense.uses}
              handleNotification={props.handleNotification}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ExpenseDetail
