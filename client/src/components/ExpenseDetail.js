import React from 'react'
import { Loader } from 'semantic-ui-react'
import { DeleteExpense, AddUse, CostChart } from '../components'
import expenseService from '../services/expenses'
const ExpenseDetail = props => {
  const expense = expenseService.getByID(props.id)
  console.log('expense detail props', expense)
  return <div>I'm an expense</div>
}

export default ExpenseDetail
