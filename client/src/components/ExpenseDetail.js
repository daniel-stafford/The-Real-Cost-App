import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import { DeleteExpense, AddUse, CostChart } from '../components'
import expenseService from '../services/expenses'
import { costPerUse } from '../utils/functions'
import moment from 'moment'

const ExpenseDetail = props => {
  const [expense, setExpense] = useState(null)
  useEffect(() => {
    expenseService.setToken(props.loggedinUser.token)
    expenseService.getAll(props.id).then(response => {
      setExpense(...response.expenses.filter(e => e.id === props.id))
    })
  }, [])
  const handleNewUse = () => {
    const useIncrease = { ...expense, uses: expense.uses + 1 }
    setExpense(useIncrease)
  }

  if (!expense) return <Loader active />
  return (
    <>
      <ul>
        <li>Title: {expense.title}</li>
        <li>Price: {expense.price}</li>
        <li>Uses: {expense.uses}</li>
        <li>Cost Per Use: {costPerUse(expense.price, expense.uses)}</li>
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
      <CostChart />
    </>
  )
}

export default ExpenseDetail
