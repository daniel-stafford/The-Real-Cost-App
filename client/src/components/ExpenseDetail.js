import React, { useEffect, useState } from 'react'
import { Loader, Header, Grid } from 'semantic-ui-react'
import {
  DeleteExpense,
  AddUse,
  CostChart,
  ExpenseCalendar
} from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import moment from 'moment'

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
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column floated="left" width={5}>
            <Header as="h1">{expense.title}</Header>
          </Grid.Column>

          <DeleteExpense
            id={expense.id}
            title={expense.title}
            uses={expense.uses}
            handleNotification={props.handleNotification}
          />
        </Grid.Row>
        <Grid.Row></Grid.Row>
        <ul>
          <li>Price: {expense.price}</li>
          <li>Uses: {expense.uses.length}</li>
          <li>
            Cost Per Use: {costPerUse(expense.price, expense.uses.length)}
          </li>
          <li>Notes: {expense.notes}</li>
          <li>Last Updated: {moment(expense.updatedAt).calendar()}</li>
          <li>Created: {moment(expense.createdAt).calendar()}</li>
        </ul>
        <AddUse
          id={expense.id}
          uses={expense.uses}
          handleNotification={props.handleNotification}
          handleNewUse={handleNewUse}
        />

        <ExpenseCalendar uses={expense.uses} />
        <CostChart expense={expense} />
      </Grid>
    </>
  )
}

export default ExpenseDetail
