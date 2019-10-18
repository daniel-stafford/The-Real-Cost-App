import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { DeleteExpense, AddUse, CostChart } from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import moment from 'moment'

const ExpenseDetail = props => {
  const [expense, setExpense] = useState(null)
  console.log('detail expense', expense)
  useEffect(() => {
    console.log('useeffect is running')
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll(props.id).then(response => {
      console.log('response in detail', response)
      setExpense(...response.expenses.filter(e => e.id === props.id))
    })
  }, [])
  if (!expense) return <Loader active />
  return (
    <>
      <ul>
        <li>Title: {expense.title}</li>
        <li>Price: {expense.price}</li>
        <li>
          Uses: {expense.uses}
          {/* <AddUse
            id={expense.id}
            handleNotification={props.handleNotification}
          /> */}
        </li>
        <li>Cost Per Use: {costPerUse(expense.price, expense.uses)}</li>
        <li>Notes: {expense.notes}</li>
        <li>Last Updated: {moment(expense.updatedAt).calendar()}</li>
        <li>Created: {moment(expense.createdAt).calendar()}</li>
      </ul>
      <CostChart />
      <DeleteExpense id={expense.id} />
    </>
  )
}

export default ExpenseDetail
