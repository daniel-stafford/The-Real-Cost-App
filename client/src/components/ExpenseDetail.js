import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { EXPENSE_BY_ID } from '../graphQL/queries'
import { Loader } from 'semantic-ui-react'
import { DeleteExpense, AddUse } from '../components'

const ExpenseDetail = ({ id, handleNotification }) => {
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
      <li>
        Uses: {e.uses}
        <AddUse id={e.id} handleNotification={handleNotification} />
      </li>

      <li>Notes: {e.notes}</li>
      <DeleteExpense id={e.id} />
    </ul>
  )
}

export default ExpenseDetail
