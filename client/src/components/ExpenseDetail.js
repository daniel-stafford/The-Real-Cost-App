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
            Now that you've added a new membership, let's start tracking when
            and how often you use it. One you add a use, we'll figure out how
            much that membership costing you each time you use it. Click the
            button below and choose a date you first used your membership.
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
      <Header as="h1">{expense.title}</Header>
      <ul>
        <li>Price: {expense.price}</li>
        <li>Uses: {expense.uses.length}</li>
        <li>Cost Per Use: {costPerUse(expense.price, expense.uses.length)}</li>
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
      <DeleteExpense
        id={expense.id}
        title={expense.title}
        uses={expense.uses}
        handleNotification={props.handleNotification}
      />
      <ExpenseCalendar uses={expense.uses} />
      <CostChart expense={expense} />
    </Grid>
  )
}

export default ExpenseDetail
