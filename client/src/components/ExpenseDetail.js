import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { EXPENSE_BY_ID } from '../graphQL/queries'

const ExpenseDetail = ({ id }) => {
  const { loading, error, data } = useQuery(EXPENSE_BY_ID, {
    variables: { id }
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log('expense data', data)
  const e = data.expenseById
  return (
    <ul>
      <li>Title: {e.title}</li>
      <li>Price: {e.price}</li>
      <li>Notes: {e.notes}</li>
      <li>Uses: {e.uses}</li>
    </ul>
  )
}

export default ExpenseDetail
