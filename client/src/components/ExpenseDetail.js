import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { DeleteExpense, AddUse, CostChart } from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import moment from 'moment'

const ExpenseDetail = props => {
  const [expense, setExpense] = useState(null)
  const [uses, setUses] = useState(null)
  useEffect(() => {
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll(props.id).then(response => {
      setExpense(...response.expenses.filter(e => e.id === props.id))
    })
  }, [])
  setUses(expense.uses)

  const handleNewUse = count => {
    console.log('handle new use firing', count)
  }

  if (!expense || !uses) return <Loader active />
  return (
    <>
      <ul>
        <li>Title: {expense.title}</li>
        <li>Price: {expense.price}</li>
        <li>
          Uses: {uses}
          <AddUse
            id={expense.id}
            uses={expense.uses}
            handleNotification={props.handleNotification}
            handleNewUse={handleNewUse}
          />
        </li>
        <li>Cost Per Use: {costPerUse(expense.price, expense.uses)}</li>
        <li>Notes: {expense.notes}</li>
        <li>Last Updated: {moment(expense.updatedAt).calendar()}</li>
        <li>Created: {moment(expense.createdAt).calendar()}</li>
      </ul>
      <DeleteExpense
        id={expense.id}
        title={expense.title}
        uses={expense.uses}
        handleNotification={props.handleNotification}
        uses={expense}
      />
      <CostChart />
    </>
  )
}

export default ExpenseDetail
