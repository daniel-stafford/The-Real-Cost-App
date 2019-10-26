import React from 'react'
import { Loader } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import expenseService from '../services/expenses'
import { Confirmation } from './index'

const DeleteExpense = ({ id, history, title, handleNotification }) => {
  const handleDelete = async isConfirmed => {
    if (isConfirmed) {
      try {
        expenseService.remove(id)
        handleNotification('success', `OK, I'll delete that!`, 2)
        setTimeout(() => {
          history.push('/expenses')
        }, 2000)
      } catch (error) {
        handleNotification(
          'error',
          `Something went wrong with deleting that. Let's go back to the expenses page`,
          2000
        )
        setTimeout(() => {
          history.push('/expenses')
        }, 2000)
      }
    }
  }
  if (!id) return <Loader active />
  return (
    <div>
      <Confirmation handleDelete={handleDelete} title={title} />
    </div>
  )
}

export default withRouter(DeleteExpense)
