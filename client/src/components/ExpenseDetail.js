import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { EXPENSE_BY_ID } from '../graphQL/queries'
import { Loader } from 'semantic-ui-react'

const ExpenseDetail = ({ id }) => {
  const { loading, error, data } = useQuery(EXPENSE_BY_ID, {
    variables: { id }
  })
  if (loading)
    return (
      <div>
        <Loader active />
      </div>
    )
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
